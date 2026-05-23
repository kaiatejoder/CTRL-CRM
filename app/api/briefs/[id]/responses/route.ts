import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: briefId } = await params
  const { data } = await req.json()

  const brief = await prisma.brief.findUnique({ where: { id: briefId } })

  if (!brief) return NextResponse.json({ error: 'Brief not found' }, { status: 404 })
  if (brief.clientId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const response = await prisma.briefResponse.create({
      data: { briefId, data, submittedAt: new Date() },
    })

    await prisma.brief.update({
      where: { id: briefId },
      data: { status: 'completed' },
    })

    return NextResponse.json(response)
  } catch {
    return NextResponse.json({ error: 'Failed to submit response' }, { status: 500 })
  }
}
