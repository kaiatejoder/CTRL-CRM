/**
 * Shop to Brief Form Integration
 *
 * After a user purchases a design service, they're redirected to the brief form
 * with pre-filled purchase information to create their design brief.
 */

import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  category: string
}

interface CheckoutCompleteProps {
  product: Product
  orderId: string
  onCreateBrief?: () => void
}

/**
 * Component shown after successful checkout
 * Prompts user to create a design brief for their purchase
 */
export function CheckoutComplete({ product, orderId, onCreateBrief }: CheckoutCompleteProps) {
  const briefFormUrl = new URL('/portal/briefs/new', window.location.origin)
  briefFormUrl.searchParams.append('orderId', orderId)
  briefFormUrl.searchParams.append('product', product.name)
  briefFormUrl.searchParams.append('productId', product.id)
  briefFormUrl.searchParams.append('category', product.category)
  briefFormUrl.searchParams.append('price', product.price.toString())

  return (
    <div className="checkout-complete">
      <div className="checkout-success">
        <h1>✓ Purchase Complete!</h1>
        <p>Thank you for your purchase of {product.name}</p>
      </div>

      <div className="checkout-next-step">
        <h2>What's Next?</h2>
        <p>
          Now let's create your design brief so our team can start working on your project.
        </p>

        <Link
          href={briefFormUrl.toString()}
          className="btn-create-brief"
          onClick={onCreateBrief}
        >
          Create Your Design Brief →
        </Link>

        <p className="checkout-help">
          You can also create this later from your{' '}
          <Link href="/portal/briefs">briefs dashboard</Link>.
        </p>
      </div>
    </div>
  )
}

/**
 * Product card with "Buy & Brief" button
 * Shows the flow: Purchase → Brief Form
 */
interface ProductCardProps {
  product: Product
  onPurchase?: (product: Product) => void
}

export function ProductCardWithBrief({ product, onPurchase }: ProductCardProps) {
  const handlePurchase = () => {
    // In real implementation:
    // 1. Process payment (Stripe, etc.)
    // 2. Create order in database
    // 3. Redirect to brief form with orderId

    if (onPurchase) {
      onPurchase(product)
    }

    // Example redirect after payment:
    // window.location.href = `/checkout?product=${product.id}`
  }

  return (
    <div className="product-card-brief">
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">€{product.price.toFixed(2)}</p>
      </div>

      <button
        onClick={handlePurchase}
        className="btn-purchase-brief"
        title="Purchase and create your design brief"
      >
        Buy & Create Brief
      </button>
    </div>
  )
}

/**
 * Integration guide for your /app/productos/page.tsx
 *
 * Example flow:
 *
 * 1. User clicks "EMPEZAR" button on a plan card
 * 2. Checkout process completes
 * 3. Server redirects to: /portal/briefs/new?orderId=xxx&product=xxx&category=xxx&price=xxx
 * 4. New brief form loads with pre-filled purchase data
 * 5. User fills in project details
 * 6. Brief is created and linked to their order
 *
 * To implement:
 *
 * In your /app/productos/page.tsx, modify the button:
 *
 * ```tsx
 * <button
 *   className="btn-add w-100"
 *   onClick={async (e: any) => {
 *     const product = e.target.dataset.product
 *     const price = e.target.dataset.price
 *     const productId = e.target.dataset.productId
 *
 *     // Process payment with Stripe/PayPal/etc
 *     // const orderId = await processPayment(product, price)
 *
 *     // For now, simulate and redirect:
 *     const orderId = 'order_' + Date.now()
 *
 *     const briefUrl = `/portal/briefs/new?orderId=${orderId}&product=${product}&productId=${productId}&price=${price}&category=plan`
 *     window.location.href = briefUrl
 *   }}
 *   data-product="Plan Pro — Mensual"
 *   data-price="449"
 *   data-product-id="plan-pro"
 * >
 *   EMPEZAR ↗
 * </button>
 * ```
 */

/**
 * Helper function to generate brief form URL from purchase
 */
export function generateBriefFormUrl(
  orderId: string,
  productName: string,
  productId: string,
  price: number,
  category: string = 'product',
  baseUrl: string = '/portal/briefs/new'
): string {
  const url = new URL(baseUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  url.searchParams.append('orderId', orderId)
  url.searchParams.append('product', productName)
  url.searchParams.append('productId', productId)
  url.searchParams.append('price', price.toString())
  url.searchParams.append('category', category)
  return url.toString()
}

/**
 * Email template to send customers after purchase
 * Includes link to brief form
 */
export function generatePurchaseEmail(
  customerName: string,
  productName: string,
  orderId: string,
  briefFormUrl: string
) {
  return `
    <h2>Order Confirmation</h2>
    <p>Hi ${customerName},</p>
    <p>Thank you for purchasing <strong>${productName}</strong>!</p>
    <p>Order ID: <code>${orderId}</code></p>

    <h3>Next Step: Create Your Design Brief</h3>
    <p>To get started, please create your design brief by clicking below:</p>

    <a href="${briefFormUrl}" style="background: #0a0a0a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">
      Create Your Design Brief
    </a>

    <p>This helps our design team understand exactly what you need.</p>
    <p>Questions? <a href="mailto:hola@ctrlstudio.co">Contact us</a></p>
  `
}
