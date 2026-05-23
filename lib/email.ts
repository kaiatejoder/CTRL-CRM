import nodemailer from 'nodemailer'
import { prisma } from './db'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendBriefEmail(
  to: string,
  briefId: string,
  clientName: string,
  briefTitle: string
) {
  const appUrl = process.env.NEXTAUTH_URL || process.env.API_URL || ''
  const briefUrl = `${appUrl}/portal/briefs/${briefId}`
  const safeName = escapeHtml(clientName)
  const safeTitle = escapeHtml(briefTitle)

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: `New Brief: ${safeTitle} - CTRL Studio`,
    html: `
      <h2>Hello ${safeName},</h2>
      <p>We have a new brief for you: <strong>${safeTitle}</strong></p>
      <p>Please click the link below to view and respond:</p>
      <a href="${briefUrl}" style="display: inline-block; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;">
        View Brief
      </a>
      <p>Thank you,<br>CTRL Studio</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)

    await prisma.emailLog.create({
      data: {
        to,
        subject: mailOptions.subject,
        type: 'brief',
        status: 'sent',
      },
    })

    return { success: true }
  } catch (error) {
    await prisma.emailLog.create({
      data: {
        to,
        subject: mailOptions.subject,
        type: 'brief',
        status: 'failed',
      },
    })

    throw error
  }
}
