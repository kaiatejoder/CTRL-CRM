import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const projects = await prisma.project.findMany({
      include: { _count: { select: { briefs: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const { name, clientId, status, startDate, endDate } = await req.json()

    if (!name || !clientId) {
      return NextResponse.json({ error: 'name and clientId are required' }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        name, clientId,
        status: status || 'active',
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
