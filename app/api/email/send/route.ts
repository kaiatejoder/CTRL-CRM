import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendBriefEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const { briefId, clientId } = await req.json()

    const brief = await prisma.brief.findUnique({ where: { id: briefId } })
    const client = await prisma.user.findUnique({ where: { id: clientId } })

    if (!brief || !client) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await sendBriefEmail(client.email, briefId, client.name, brief.title)

    await prisma.notification.create({
      data: {
        userId: clientId,
        title: 'New Brief',
        message: `You have a new brief: ${brief.title}`,
        type: 'brief_sent',
      },
    })

    await prisma.brief.update({
      where: { id: briefId },
      data: { status: 'sent' },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
