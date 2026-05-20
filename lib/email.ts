import nodemailer from 'nodemailer'
import { prisma } from './db'

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
  const briefUrl = `${process.env.API_URL}/briefs/${briefId}`

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: `New Brief: ${briefTitle} - CTRL Studio`,
    html: `
      <h2>Hello ${clientName},</h2>
      <p>We have a new brief for you: <strong>${briefTitle}</strong></p>
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
