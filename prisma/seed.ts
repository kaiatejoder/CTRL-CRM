import { prisma } from '../lib/db'
import bcrypt from 'bcryptjs'

async function main() {
  const adminEmail = 'admin@ctrlstudio.com'
  const tempPassword = Math.random().toString(36).substring(2, 15).toUpperCase()
  const hashedPassword = await bcrypt.hash(tempPassword, 12)

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log('Admin user already exists. Skipping creation.')
    return
  }

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('\n✅ Admin user created successfully!\n')
  console.log('Admin Credentials:')
  console.log(`Email: ${adminEmail}`)
  console.log(`Temporary Password: ${tempPassword}`)
  console.log('\n⚠️  Please log in and change this password immediately!\n')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
