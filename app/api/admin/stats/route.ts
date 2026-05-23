import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const [totalClients, totalProjects, totalBriefs, pendingBriefs] = await Promise.all([
      prisma.user.count({ where: { role: 'client' } }),
      prisma.project.count(),
      prisma.brief.count(),
      prisma.brief.count({ where: { status: { in: ['sent', 'in_progress'] } } }),
    ])

    return NextResponse.json({ totalClients, totalProjects, totalBriefs, pendingBriefs })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
