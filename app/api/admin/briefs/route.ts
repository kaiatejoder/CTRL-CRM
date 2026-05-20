import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const briefs = await prisma.brief.findMany({
    include: {
      _count: {
        select: { responses: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(briefs)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { title, description, type, clientId, projectId, dueDate } = await req.json()

  const brief = await prisma.brief.create({
    data: {
      title,
      description,
      type,
      clientId,
      projectId,
      dueDate: dueDate ? new Date(dueDate) : null,
      status: 'draft',
    },
  })

  return NextResponse.json(brief)
}
