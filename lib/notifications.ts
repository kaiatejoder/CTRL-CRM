import { prisma } from './db'

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: string
) {
  return await prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
    },
  })
}

export async function markAsRead(notificationId: string) {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  })
}

export async function getUnreadCount(userId: string) {
  return await prisma.notification.count({
    where: {
      userId,
      read: false,
    },
  })
}
