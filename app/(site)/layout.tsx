import Script from 'next/script'

const PAGE_STYLES = [
  '/css/index-inline.css',
  '/css/productos-inline.css',
  '/css/carrito-inline.css',
  '/css/compra-inline.css',
  '/css/empresa.css',
  '/css/styles-contacto.css',
  '/css/usuario-inline.css',
  '/css/usuario-dashboard.css',
  '/css/usuario-panels.css',
] as const

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      {PAGE_STYLES.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
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
