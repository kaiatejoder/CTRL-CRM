import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const briefs = await prisma.brief.findMany({
      include: { _count: { select: { responses: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(briefs)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch briefs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const { title, description, type, clientId, projectId, dueDate } = await req.json()

    if (!title || !type || !clientId) {
      return NextResponse.json({ error: 'title, type, and clientId are required' }, { status: 400 })
    }

    const brief = await prisma.brief.create({
      data: {
        title, description, type, clientId,
        projectId: projectId || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: 'draft',
      },
    })
    return NextResponse.json(brief)
  } catch {
    return NextResponse.json({ error: 'Failed to create brief' }, { status: 500 })
  }
}
