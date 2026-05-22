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
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contentType = req.headers.get('content-type') || ''

    // Handle FormData from client form submission
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()

      const briefTitle = formData.get('briefTitle') as string
      const projectDescription = formData.get('projectDescription') as string
      const brandName = formData.get('brandName') as string
      const targetAudience = formData.get('targetAudience') as string
      const designPreferences = formData.get('designPreferences') as string
      const timeline = formData.get('timeline') as string
      const budget = formData.get('budget') as string
      const additionalNotes = formData.get('additionalNotes') as string
      const orderId = formData.get('orderId') as string

      if (!briefTitle || !projectDescription || !brandName) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        )
      }

      // Create brief from client form
      const brief = await prisma.brief.create({
        data: {
          title: briefTitle,
          description: projectDescription,
          type: 'client-submitted',
          status: 'pending_review',
          clientId: session.user.id,
        },
      })

      // Store form response data
      const responseData = {
        brandName,
        targetAudience,
        designPreferences,
        timeline,
        budget,
        additionalNotes,
        orderId,
        submittedAt: new Date().toISOString(),
      }

      await prisma.briefResponse.create({
        data: {
          briefId: brief.id,
          data: responseData,
        },
      })

      return NextResponse.json(brief, { status: 201 })
    }

    // Handle JSON from admin API
    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

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
    console.error('Brief creation error:', error)
    return NextResponse.json({ error: 'Failed to create brief' }, { status: 400 })
  }
}
