'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, FileText, Briefcase, TrendingUp } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Stats {
  totalClients: number
  totalProjects: number
  totalBriefs: number
  pendingBriefs: number
}

interface RecentBrief {
  id: string
  title: string
  clientId: string
  status: string
  createdAt: string
}

function StatCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: number
  href: string
}) {
  return (
    <Link
      href={href}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-blue-600 opacity-60">{icon}</div>
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    totalProjects: 0,
    totalBriefs: 0,
    pendingBriefs: 0,
  })
  const [recentBriefs, setRecentBriefs] = useState<RecentBrief[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsRes, briefsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/briefs?limit=5'),
        ])

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }

        if (briefsRes.ok) {
          const briefsData = await briefsRes.json()
          setRecentBriefs(briefsData)
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your CRM system</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="text-center py-12">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 gap-4">
            <StatCard
              icon={<Users size={32} />}
              label="Total Clients"
              value={stats.totalClients}
              href="/admin/clients"
            />
            <StatCard
              icon={<Briefcase size={32} />}
              label="Active Projects"
              value={stats.totalProjects}
              href="/admin/projects"
            />
            <StatCard
              icon={<FileText size={32} />}
              label="Total Briefs"
              value={stats.totalBriefs}
              href="/admin/briefs"
            />
            <StatCard
              icon={<TrendingUp size={32} />}
              label="Pending Responses"
              value={stats.pendingBriefs}
              href="/admin/briefs"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Briefs</h2>
            {recentBriefs.length === 0 ? (
              <p className="text-gray-600">No briefs created yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBriefs.map((brief) => (
                      <tr key={brief.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{brief.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {brief.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(brief.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/admin/briefs/${brief.id}`}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
