import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const clients = await prisma.user.findMany({
    where: { role: 'client' },
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      phone: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(clients)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { name, email, company, phone } = await req.json()

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  const tempPassword = Math.random().toString(36).slice(-12)
  const hashedPassword = await bcrypt.hash(tempPassword, 12)

  const client = await prisma.user.create({
    data: {
      name,
      email,
      company,
      phone,
      password: hashedPassword,
      role: 'client',
    },
  })

  return NextResponse.json(client)
}
