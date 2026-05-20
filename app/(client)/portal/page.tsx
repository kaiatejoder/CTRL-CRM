'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ArrowRight, Calendar, AlertCircle } from 'lucide-react'

interface Brief {
  id: string
  title: string
  description: string
  type: string
  status: string
  dueDate: string | null
  createdAt: string
}

interface Project {
  id: string
  name: string
  status: string
  startDate: string | null
  endDate: string | null
}

export default function PortalPage() {
  const { data: session } = useSession()
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [briefsRes, projectsRes] = await Promise.all([
          fetch('/api/briefs'),
          fetch('/api/projects'),
        ])

        if (briefsRes.ok) {
          const briefsData = await briefsRes.json()
          setBriefs(briefsData)
        }

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json()
          setProjects(projectsData)
        }
      } catch (err) {
        setError('Failed to load portal data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading your portal...</div>
  }

  const pendingBriefs = briefs.filter((b) => b.status === 'sent' || b.status === 'in_progress')
  const completedBriefs = briefs.filter((b) => b.status === 'completed')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session?.user?.name}</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your projects and briefs</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Active Briefs Section */}
      {pendingBriefs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Active Briefs</h2>
            <Link
              href="/portal/briefs"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {pendingBriefs.map((brief) => (
              <Link
                key={brief.id}
                href={`/portal/briefs/${brief.id}`}
                className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{brief.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    {brief.status === 'sent' ? 'New' : 'In Progress'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{brief.description}</p>
                {brief.dueDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    Due {new Date(brief.dueDate).toLocaleDateString()}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Projects</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-lg p-5"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {project.status}
                  </span>
                </div>
                {project.startDate && (
                  <p className="text-sm text-gray-600 mt-3">
                    Started {new Date(project.startDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Section */}
      {completedBriefs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Briefs</h2>
          <div className="space-y-2">
            {completedBriefs.map((brief) => (
              <Link
                key={brief.id}
                href={`/portal/briefs/${brief.id}`}
                className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{brief.title}</h4>
                    <p className="text-sm text-gray-600">
                      Completed {new Date(brief.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {briefs.length === 0 && projects.length === 0 && (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">No briefs or projects yet</p>
          <p className="text-sm text-gray-500">Check back soon for new briefs from CTRL Studio</p>
        </div>
      )}
    </div>
  )
}
