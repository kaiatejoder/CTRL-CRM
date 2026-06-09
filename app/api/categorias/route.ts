import { NextResponse } from 'next/server'

const categorias = [
  { codigo: 1, descripcion: 'Branding' },
  { codigo: 2, descripcion: 'Plantillas' },
  { codigo: 3, descripcion: 'Consultoría' },
]

export async function GET() {
  return NextResponse.json(categorias)
}
