import React from 'react'
import Script from 'next/script'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="/css/styles.css" />
      <link rel="stylesheet" href="/css/index-inline.css" />
      <link rel="stylesheet" href="/css/productos-inline.css" />
      <link rel="stylesheet" href="/css/carrito-inline.css" />
      <link rel="stylesheet" href="/css/compra-inline.css" />
      <link rel="stylesheet" href="/css/empresa.css" />
      <link rel="stylesheet" href="/css/styles-contacto.css" />
      <link rel="stylesheet" href="/css/usuario-inline.css" />
      {children}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  )
}
