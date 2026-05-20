import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { briefSchema } from '@/lib/validators'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const searchParams = new URL(req.url).searchParams
  const limit = parseInt(searchParams.get('limit') || '50')
  const isAdmin = session.user.role === 'admin'

  const where = isAdmin ? {} : { clientId: session.user.id }

  const briefs = await prisma.brief.findMany({
    where,
    include: { project: true, responses: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return NextResponse.json(briefs)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { title, description, type, dueDate } = briefSchema.parse(body)

    const brief = await prisma.brief.create({
      data: {
        title,
        description,
        type,
        dueDate: dueDate ? new Date(dueDate) : null,
        clientId: body.clientId,
      },
    })

    return NextResponse.json(brief, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create brief' }, { status: 400 })
  }
}
