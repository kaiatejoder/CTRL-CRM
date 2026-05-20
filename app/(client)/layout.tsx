'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Bell, Home, FileText } from 'lucide-react'
import { signOut } from 'next-auth/react'

export const dynamic = 'force-dynamic'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionResult = useSession()
  const session = sessionResult?.data
  const status = sessionResult?.status

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated' || !session?.user || session?.user?.role === 'admin') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/portal" className="text-2xl font-bold text-black">
              CTRL Studio
            </Link>
            <div className="hidden md:flex gap-6">
              <Link
                href="/portal"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition"
              >
                <Home size={18} />
                Portal
              </Link>
              <Link
                href="/portal/briefs"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition"
              >
                <FileText size={18} />
                Briefs
              </Link>
              <Link
                href="/portal/notifications"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition"
              >
                <Bell size={18} />
                Notifications
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">{session?.user?.name}</span>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
