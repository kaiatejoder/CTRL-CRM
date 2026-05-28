import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const clients = await prisma.user.findMany({
      where: { role: 'client' },
      select: { id: true, name: true, email: true, company: true, phone: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(clients)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const { name, email, company, phone } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    const tempPassword = randomBytes(12).toString('base64url')
    const hashedPassword = await bcrypt.hash(tempPassword, 12)

    const client = await prisma.user.create({
      data: { name, email, company, phone, password: hashedPassword, role: 'client' },
      select: { id: true, name: true, email: true, company: true, phone: true, createdAt: true },
    })

    return NextResponse.json({ ...client, tempPassword }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
