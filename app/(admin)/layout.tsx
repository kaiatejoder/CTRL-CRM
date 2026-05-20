'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, BarChart3, Users, FileText, Briefcase } from 'lucide-react'
import { signOut } from 'next-auth/react'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
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

  if (status === 'unauthenticated' || !session?.user || session?.user?.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg overflow-y-auto">
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold">
            CTRL Admin
          </Link>
          <p className="text-gray-400 text-sm mt-2">Project Management System</p>
        </div>

        <nav className="px-4 py-6 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-100 hover:bg-gray-800 transition"
          >
            <BarChart3 size={20} />
            Dashboard
          </Link>
          <Link
            href="/admin/clients"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-100 hover:bg-gray-800 transition"
          >
            <Users size={20} />
            Clients
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-100 hover:bg-gray-800 transition"
          >
            <Briefcase size={20} />
            Projects
          </Link>
          <Link
            href="/admin/briefs"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-100 hover:bg-gray-800 transition"
          >
            <FileText size={20} />
            Briefs
          </Link>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-100 hover:bg-gray-800 rounded-lg transition"
          >
            <LogOut size={20} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome, {session?.user?.name}</div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
