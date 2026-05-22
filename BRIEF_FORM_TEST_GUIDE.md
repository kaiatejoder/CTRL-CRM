# Brief Form Testing Guide

## Complete Flow: Shop → Checkout → Brief Form

The brief form system is now fully integrated with the shop. Here's how to test the complete flow:

### Test Flow (Local Development)

```
1. /productos → Click "EMPEZAR" button on a plan
   ↓
2. /checkout?product=Plan%20Pro&price=449&category=plan
   ↓ Click "Complete Payment" (simulates payment)
   ↓
3. /portal/briefs/new?orderId=order_xxx&product=Plan%20Pro&price=449&productId=prod_plan_xxx&category=plan
   ↓ Auto-populate & fill form
   ↓
4. Click "Submit Brief"
   ↓
5. Success state → Redirect to brief detail page
```

### Step-by-Step Testing

#### Step 1: Start on Products Page
```
Navigate to: http://localhost:3000/productos
```
- Should see three plan cards (Starter €199, Pro €449, Studio €899)
- "EMPEZAR ↗" buttons are now using the checkout flow

#### Step 2: Click Purchase Button
```
Click: "EMPEZAR ↗" on Plan Pro (or any plan)
```
Expected behavior:
- Redirects to checkout page with product details
- URL should be: `http://localhost:3000/checkout?product=Plan+Pro+%E2%80%94+Mensual&price=449&category=plan`

#### Step 3: Checkout Page
```
You should see:
- Order Summary with product name and price
- "Complete Payment" button (disabled while processing)
```

Click "Complete Payment":
- Button shows "Processing... (2s)" for 2 seconds
- After 2 seconds, automatically redirects to brief form

#### Step 4: Brief Form Auto-Population
```
URL should be something like:
http://localhost:3000/portal/briefs/new?orderId=order_1621234567&product=Plan+Pro+%E2%80%94+Mensual&productId=prod_plan_1621234567&price=449&category=plan
```

Expected behavior:
- ✅ Brief Title auto-filled: "Plan Pro — Mensual — Design Brief"
- ✅ Order card appears showing:
  - Product: Plan Pro — Mensual
  - Order ID: order_xxx
  - Investment: €449
- Form sections visible with all input fields empty except title

#### Step 5: Fill Out Form
Required fields (marked with *):
1. **Brief Title** - Already filled (Edit if needed)
2. **Brand / Company Name** - Fill with your brand
3. **Project Description** - Fill with details

Optional fields:
- Target Audience
- Design Preferences & Inspiration
- Timeline (dropdown - defaults to "Standard")
- Budget Range
- Attachments (Upload files)
- Additional Notes

#### Step 6: Submit Form
Click "Submit Brief":
- Form validates required fields
- Shows errors if any required field is empty
- On success:
  - Shows success state (✓ Brief Created)
  - Displays loading dots animation
  - After 2 seconds, redirects to brief detail page

### Direct Testing (Bypass Checkout)

If you want to test the form directly without going through checkout:

```
Navigate to:
http://localhost:3000/portal/briefs/new?orderId=order_test&product=Test+Plan&productId=test-plan&price=499&category=plan
```

The form should auto-populate with:
- Brief Title: "Test Plan — Design Brief"
- Order Card showing: order_test, Test Plan, €499

### API Endpoint Testing

#### Test Form Submission (POST /api/briefs)

The form sends a POST request to `/api/briefs` with FormData:

**Expected behavior:**
- ✅ Validates required fields (briefTitle, projectDescription, brandName)
- ✅ Creates Brief record with status "pending_review"
- ✅ Creates BriefResponse record with all form data
- ✅ Returns brief ID in response
- ✅ Returns 201 status (Created)

**On error:**
- Returns 400 with "Missing required fields"
- Returns 401 if user not authenticated
- Returns 400 with "Failed to create brief" on server error

### Test Cases Checklist

#### Happy Path ✓
- [ ] Click button on /productos
- [ ] Redirects to /checkout with correct params
- [ ] Click "Complete Payment"
- [ ] Redirects to /portal/briefs/new with order data
- [ ] Brief title auto-populates
- [ ] Order card displays correctly
- [ ] Fill all required fields
- [ ] Click "Submit Brief"
- [ ] See success state
- [ ] Redirects to brief detail page
- [ ] Brief appears in admin dashboard

#### Edge Cases
- [ ] Empty brief title (should show error)
- [ ] Empty project description (should show error)
- [ ] Empty brand name (should show error)
- [ ] Fill target audience (optional - should allow)
- [ ] Upload file (should handle)
- [ ] Mobile responsive (test on mobile viewport)
- [ ] Dark mode (if applicable)

#### URL Parameter Validation
- [ ] Missing orderId (should still work, no order card)
- [ ] Missing product name (title won't auto-fill)
- [ ] URL-encoded special characters (should decode correctly)
- [ ] Very long product name (should display properly)

### Vercel Deployment Testing

After pushing to Vercel:

```
1. Navigate to: https://ctrl-crm-nine.vercel.app/productos
2. Click "EMPEZAR" button
3. Complete checkout flow
4. Fill and submit form
5. Verify brief appears in admin dashboard
```

### Common Issues & Fixes

#### "Brief Form Not Loading"
- Check browser console for errors
- Verify CSS module is imported correctly
- Check that all required CSS variables are defined

#### "Form Not Auto-Populating"
- Check URL parameters are URL-encoded
- Open browser console and verify `useSearchParams()` is working
- Check that values are being passed from checkout page

#### "Submit Button Does Nothing"
- Check form validation errors (should display below fields)
- Verify API endpoint `/api/briefs` is accessible
- Check browser console for fetch errors
- Verify user is authenticated (check session)

#### "File Upload Not Working"
- Check file size is under 50MB
- Verify MIME type is supported (PNG, JPG, PDF, ZIP)
- Check API endpoint is properly handling FormData
- Verify upload directory has write permissions

### Success Indicators

When the system is working correctly, you should see:

1. **On Checkout Page:**
   - Order summary displays correctly
   - Payment button works
   - 2-second processing delay

2. **On Brief Form Page:**
   - Title auto-populates from URL param
   - Order card shows product info
   - All form sections are visible
   - Validation errors appear when needed
   - Submit is disabled while loading

3. **On Success:**
   - ✓ icon displays
   - "Brief Created" message shows
   - Loading dots animate
   - Auto-redirect after 2 seconds

4. **In Database:**
   - New Brief record created with status "pending_review"
   - BriefResponse record contains all form data
   - Both timestamps are set

### Database Verification

After submitting a form, verify in the database:

```sql
-- Check brief was created
SELECT id, title, status, clientId, createdAt FROM Brief 
WHERE type = 'client-submitted' 
ORDER BY createdAt DESC 
LIMIT 1;

-- Check brief response was stored
SELECT briefId, data FROM BriefResponse 
WHERE briefId = 'ID_FROM_ABOVE'
ORDER BY createdAt DESC 
LIMIT 1;
```

The `data` field should contain JSON with all form data:
```json
{
  "brandName": "...",
  "targetAudience": "...",
  "designPreferences": "...",
  "timeline": "...",
  "budget": "...",
  "additionalNotes": "...",
  "orderId": "order_xxx",
  "submittedAt": "2026-05-21T10:30:00Z"
}
```

### Performance Testing

- Checkout page should load in < 200ms
- Brief form page should load in < 500ms
- Form submission should complete in < 2s
- Success animation should be smooth (60fps)

### Accessibility Testing

- [ ] Keyboard navigation through form (Tab key)
- [ ] Focus indicators visible on all inputs
- [ ] Form labels associated with inputs
- [ ] Error messages announced to screen readers
- [ ] Success state clearly indicates completion

---

## Integration with Payment Providers

Currently the checkout page simulates payment with a 2-second delay. To integrate real payments:

### Stripe Integration

```tsx
// In checkout page
import { loadStripe } from '@stripe/js'

const handlePayment = async () => {
  const stripe = await loadStripe(STRIPE_KEY)
  const { sessionId } = await fetch('/api/checkout-session', {
    method: 'POST',
    body: JSON.stringify({ product, price })
  }).then(r => r.json())
  
  await stripe.redirectToCheckout({ sessionId })
  // After payment, Stripe redirects to /portal/briefs/new with order data
}
```

### PayPal Integration

Similar flow using PayPal SDK and server-side order creation.

---

## Next Steps

1. ✅ Test the complete flow locally
2. ⬜ Push to Vercel and verify deployment
3. ⬜ Integrate real payment processor (Stripe/PayPal)
4. ⬜ Update confirmation emails to include brief form link
5. ⬜ Set up admin dashboard to display pending briefs
6. ⬜ Create admin response/feedback system

---

**Need help?** Check the main `BRIEF_FORM_INTEGRATION.md` for architecture details.
