# Design Brief Form Integration Guide

## Overview

The brief form system allows customers to create design briefs **after purchasing products** from your shop. The form pre-fills with purchase data and guides them through a structured process.

## System Architecture

```
Shop (productos/page.tsx)
    ↓ [User clicks "Buy"]
    ↓
Payment Processing (Stripe/PayPal/etc)
    ↓
Checkout Success
    ↓
Redirect → /portal/briefs/new?orderId=xxx&product=xxx&price=xxx
    ↓
Brief Form (prefilled from URL params)
    ↓
Form Submission → POST /api/briefs
    ↓
Database (Brief + BriefResponse)
    ↓
Admin Dashboard (review new briefs)
```

## Files Created

### 1. **Brief Form Page**
   - **Location**: `app/(client)/portal/briefs/new/page.tsx`
   - **Purpose**: Main form for creating design briefs
   - **Features**:
     - Auto-populates from purchase URL params
     - 4-section form structure (Basics, Audience, Timeline, References)
     - File upload support
     - Form validation
     - Success state animation

### 2. **Form Styling**
   - **Location**: `app/(client)/portal/briefs/new/brief-form.module.css`
   - **Features**:
     - Helvetica Now Display typography
     - Swiss grid-based layout (8px spacing)
     - Bitmap-style borders and details
     - Responsive design (mobile to desktop)
     - Dark mode ready

### 3. **Updated API Route**
   - **Location**: `app/api/briefs/route.ts`
   - **Features**:
     - Handles FormData from client form
     - Stores form responses in BriefResponse table
     - Validates required fields
     - Supports both admin (JSON) and client (FormData) submissions

### 4. **Integration Components**
   - **Location**: `lib/components/ShopBriefIntegration.tsx`
   - **Features**:
     - `CheckoutComplete` - Post-purchase screen
     - `ProductCardWithBrief` - Product card with purchase flow
     - Helper functions for URL generation
     - Email template generator

## Implementation Steps

### Step 1: Update Your Shop Button

In `app/productos/page.tsx`, modify the "EMPEZAR" buttons:

```tsx
<button
  className="btn-add w-100"
  onClick={async (e: any) => {
    const productName = e.target.dataset.product
    const price = e.target.dataset.price
    const productId = e.target.dataset.productId

    // TODO: Integrate with Stripe/PayPal
    // For now, simulate payment and redirect:
    const orderId = 'order_' + Date.now()

    const briefUrl = `/portal/briefs/new?orderId=${orderId}&product=${encodeURIComponent(productName)}&productId=${productId}&price=${price}&category=plan`
    window.location.href = briefUrl
  }}
  data-product="Plan Pro — Mensual"
  data-price="449"
  data-product-id="plan-pro"
>
  EMPEZAR ↗
</button>
```

### Step 2: Connect Payment Gateway

In your checkout flow, after successful payment:

```tsx
// After Stripe/PayPal payment succeeds:
const order = await createOrder({
  customerId: user.id,
  productId: product.id,
  amount: product.price,
  status: 'completed',
})

// Redirect to brief form
const briefUrl = generateBriefFormUrl(
  order.id,
  product.name,
  product.id,
  product.price
)
window.location.href = briefUrl
```

### Step 3: Update Database Schema (Optional)

If you want to track orders separately:

```prisma
model Order {
  id        String    @id @default(cuid())
  customerId String
  customer  User      @relation(fields: [customerId], references: [id])
  productId String
  amount    Float
  status    String    @default("pending")
  createdAt DateTime  @default(now())
  briefs    Brief[]   // Link briefs to orders
}

model Brief {
  // ... existing fields ...
  orderId   String?
  order     Order?    @relation(fields: [orderId], references: [id])
}
```

Then migrate:

```bash
npx prisma migrate dev --name add_order_support
```

### Step 4: Send Post-Purchase Email

In your payment success handler:

```tsx
import { generatePurchaseEmail } from '@/lib/components/ShopBriefIntegration'

// After order creation:
const briefUrl = generateBriefFormUrl(order.id, product.name, product.id, product.price)
const emailHtml = generatePurchaseEmail(
  customer.name,
  product.name,
  order.id,
  briefUrl
)

await sendEmail({
  to: customer.email,
  subject: `Order Confirmation: ${product.name}`,
  html: emailHtml,
})
```

## URL Parameters

When redirecting to `/portal/briefs/new`, pass these query params:

| Parameter   | Required | Description                    | Example           |
|-------------|----------|--------------------------------|-------------------|
| `orderId`   | ✓        | Unique order identifier        | `order_1621234567` |
| `product`   | ✓        | Product/plan name              | `Plan Pro — Mensual` |
| `productId` | ✓        | Product ID                     | `plan-pro`        |
| `price`     | ✓        | Price (for display)            | `449`             |
| `category`  | ○        | Product category               | `plan`, `product` |

**Form auto-fills:**
- Brief Title → `{product} — Design Brief`
- All other fields empty for customer to fill

## Form Sections Breakdown

### 01. Brief Basics
- **Brief Title** - Pre-filled from product name
- **Brand/Company Name** - User input
- **Project Description** - Detailed textarea

### 02. Audience & Design Direction
- **Target Audience** - Who are we designing for?
- **Design Preferences** - Style, color, references

### 03. Project Timeline & Budget
- **Timeline** - Dropdown: Urgent (1-2w), Standard (2-4w), Flexible (4+w)
- **Budget Range** - Optional, for context

### 04. References & Additional Info
- **Attachments** - Upload files (PNG, JPG, PDF, ZIP, max 50MB)
- **Additional Notes** - Questions, requirements

## Database Schema

### Brief Response
The form submission is stored in `BriefResponse`:

```json
{
  "id": "resp_abc123",
  "briefId": "brief_xyz789",
  "data": {
    "brandName": "TechStartup Inc",
    "targetAudience": "Tech-savvy professionals",
    "designPreferences": "Minimalist, modern aesthetic",
    "timeline": "standard",
    "budget": "€2000-€5000",
    "additionalNotes": "See attached mood board",
    "orderId": "order_1621234567",
    "submittedAt": "2026-05-21T10:30:00Z"
  },
  "submittedAt": "2026-05-21T10:30:00Z"
}
```

## Admin Dashboard Integration

In the admin briefs page, you can:

1. **View new briefs** with status `pending_review`
2. **See linked order data** by querying BriefResponse
3. **Assign to designers** after review
4. **Send feedback** back to clients

## Styling Customization

The form uses CSS custom properties (variables) for easy theming:

```css
:root {
  --black: #0a0a0a;          /* Main text */
  --white: #ffffff;           /* Background */
  --accent: #0052cc;          /* Action color (blue) */
  --error: #d32f2f;           /* Error color (red) */
  
  /* Change accent to your brand color: */
  --accent: #ff6b35;          /* Your brand orange */
}
```

## Mobile Responsiveness

- **Desktop**: Full 4-section layout with grid positioning
- **Tablet**: Single column, flexible sections
- **Mobile**: Optimized touch targets, larger buttons

## Accessibility

- Full keyboard navigation
- ARIA labels on all inputs
- Focus indicators with ring styling
- Proper heading hierarchy
- Color contrast compliance (WCAG AA)

## Security Considerations

1. **Validate server-side** - All required fields checked on API
2. **File upload limits** - 50MB max, restrict file types
3. **CSRF protection** - NextAuth handles CSRF tokens
4. **Rate limiting** - Implement on `/api/briefs` endpoint
5. **User verification** - Ensure user is authenticated before creating

## Analytics & Tracking

Track brief creation funnel:

```tsx
// In form submission:
if (success) {
  // Track event in your analytics:
  gtag('event', 'brief_created', {
    'order_id': orderId,
    'product_name': productName,
    'form_time': endTime - startTime,
  })
}
```

## Testing

### Happy Path
1. Visit `/portal/briefs/new?orderId=order_test&product=Plan%20Pro&productId=plan-pro&price=449`
2. Verify title is pre-filled
3. Fill remaining fields
4. Submit form
5. See success state
6. Verify brief appears in admin dashboard

### Edge Cases
- Missing required params → Should gracefully handle
- Empty file upload → Should allow submission
- Long text input → Should wrap properly
- Mobile viewport → Should be usable

## Troubleshooting

### Form not pre-filling
- Check URL params are URL-encoded
- Ensure `useSearchParams()` hook is working
- Check browser console for errors

### Files not uploading
- Verify API endpoint supports FormData
- Check file size is under 50MB
- Ensure proper MIME types

### Brief not appearing in admin
- Check user role is "client" (not "admin")
- Verify brief status is "pending_review"
- Check database for BriefResponse record

## Future Enhancements

- [ ] Real-time form save (autosave to localStorage)
- [ ] Multi-file drag-and-drop
- [ ] Rich text editor for descriptions
- [ ] Progress indicator
- [ ] Form templates by product category
- [ ] Conditional fields based on product type
- [ ] Integration with design software APIs
- [ ] Real-time admin notifications
- [ ] Client-admin messaging within form

---

**Questions?** Email: hola@ctrlstudio.co
