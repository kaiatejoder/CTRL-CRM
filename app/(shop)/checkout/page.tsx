'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'

function CheckoutContent() {
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
      await new Promise(resolve => setTimeout(resolve, 2000))

      const orderId = `order_${Date.now()}`
      const productId = `prod_${categoria}_${Date.now()}`

      const briefUrl = `/portal/briefs/new?${new URLSearchParams({
        orderId,
        product: producto,
        productId,
        price: precio,
        category: categoria,
      }).toString()}`

      router.push(briefUrl)
    } catch {
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
