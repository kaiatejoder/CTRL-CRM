'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Simple checkout page that simulates payment and redirects to brief form
 * In production, replace with Stripe/PayPal integration
 */
export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const producto = searchParams.get('product') || 'Diseño'
  const precio = searchParams.get('price') || '0'
  const categoria = searchParams.get('category') || 'service'

  const handlePayment = async () => {
    setProcessing(true)

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In production, you would:
      // 1. Call Stripe/PayPal API
      // 2. Create order in database
      // 3. Get real orderId from response

      // For now, generate a test orderId
      const orderId = `order_${Date.now()}`
      const productId = `prod_${categoria}_${Date.now()}`

      // Build brief form URL with purchase data
      const briefUrl = `/portal/briefs/new?${new URLSearchParams({
        orderId,
        product: producto,
        productId,
        price: precio,
        category: categoria,
      }).toString()}`

      // Redirect to brief form
      router.push(briefUrl)
    } catch (err) {
      setError('Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '20px' }}>
      <h1>Checkout</h1>

      <div style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h3>Order Summary</h3>
        <p><strong>Product:</strong> {producto}</p>
        <p><strong>Price:</strong> €{precio}</p>
        <hr />
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Total: €{precio}
        </p>
      </div>

      {error && (
        <div style={{
          color: '#d32f2f',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #d32f2f',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={processing}
        style={{
          width: '100%',
          padding: '12px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: processing ? '#ccc' : '#0052cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: processing ? 'not-allowed' : 'pointer',
        }}
      >
        {processing ? 'Processing... (2s)' : 'Complete Payment'}
      </button>

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        ℹ️ This is a test checkout. In production, integrate with Stripe, PayPal, or your payment provider.
      </p>
    </div>
  )
}
