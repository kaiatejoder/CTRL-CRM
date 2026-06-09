import { NextRequest, NextResponse } from 'next/server'

const productos = [
  { codigo: 'p01', nombre: 'Identidad Visual Completa', descripcion: 'Logo, paleta de colores, tipografía, manual de marca y aplicaciones. Entrega en 7 días.', precio: 890, existencias: 10, categoria: 'Branding' },
  { codigo: 'p02', nombre: 'Branding Express', descripcion: 'Logo + paleta + tipografía básica. Ideal para arrancar rápido.', precio: 390, existencias: 10, categoria: 'Branding' },
  { codigo: 'p03', nombre: 'Rediseño de Marca', descripcion: 'Evolución de tu identidad actual. Auditamos, proponemos y ejecutamos.', precio: 650, existencias: 5, categoria: 'Branding' },
  { codigo: 'p04', nombre: 'Manual de Marca', descripcion: 'Documentación completa de tu identidad: uso de logo, colores, tipografía y voz de marca.', precio: 290, existencias: 10, categoria: 'Branding' },
  { codigo: 'p05', nombre: 'Pack Redes Sociales', descripcion: 'Templates editables para Instagram, LinkedIn y TikTok. 12 plantillas Canva/Figma.', precio: 129, existencias: 99, categoria: 'Plantillas' },
  { codigo: 'p06', nombre: 'Pack Presentaciones', descripcion: 'Plantilla de presentación en Keynote, PowerPoint y Google Slides. 30 slides.', precio: 89, existencias: 99, categoria: 'Plantillas' },
  { codigo: 'p07', nombre: 'Kit de Papelería', descripcion: 'Tarjeta de visita, hoja membretada, firma de email y sobre. Listos para imprimir.', precio: 149, existencias: 99, categoria: 'Plantillas' },
  { codigo: 'p08', nombre: 'Pack Email Marketing', descripcion: '8 templates HTML para newsletters. Compatibles con Mailchimp y Klaviyo.', precio: 99, existencias: 99, categoria: 'Plantillas' },
  { codigo: 'p09', nombre: 'Auditoría de Marca', descripcion: 'Análisis de tu identidad actual, competidores y posicionamiento. Entrega de informe + recomendaciones.', precio: 250, existencias: 8, categoria: 'Consultoría' },
  { codigo: 'p10', nombre: 'Sesión Estrategia Visual', descripcion: '90 min de consultoría 1:1 para definir tu dirección creativa. Grabación incluida.', precio: 180, existencias: 10, categoria: 'Consultoría' },
  { codigo: 'p11', nombre: 'Pack Lanzamiento', descripcion: 'Todo lo que necesitas para lanzar tu marca: identidad, redes, presentación y web one-pager.', precio: 1490, existencias: 3, categoria: 'Branding' },
  { codigo: 'p12', nombre: 'Naming + Branding', descripcion: 'Creamos el nombre de tu marca y la identidad visual completa desde cero.', precio: 990, existencias: 5, categoria: 'Branding' },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const categoria = searchParams.get('categoria')
  const q = searchParams.get('q')?.toLowerCase()

  let result = productos

  if (categoria) {
    const id = parseInt(categoria)
    const cats: Record<number, string> = { 1: 'Branding', 2: 'Plantillas', 3: 'Consultoría' }
    result = result.filter(p => p.categoria === cats[id])
  }

  if (q) {
    result = result.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q)
    )
  }

  return NextResponse.json(result)
}
