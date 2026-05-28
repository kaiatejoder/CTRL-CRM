import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'
import { signupSchema } from '@/lib/validators'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name, company } = signupSchema.parse(body)

    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await hash(password, 12)

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        company,
        role: 'client',
      },
    })

    return NextResponse.json({ message: 'User created' }, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Signup failed' }, { status: 400 })
  }
}
