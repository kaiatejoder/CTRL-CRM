'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Brief {
  id: string
  title: string
  description: string
  type: string
  status: string
  dueDate: string | null
  createdAt: string
}

export default function BriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredBriefs = useMemo(() => {
    let filtered = briefs
    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((b) => b.status === statusFilter)
    }
    return filtered
  }, [searchTerm, statusFilter, briefs])

  useEffect(() => {
    async function fetchBriefs() {
      try {
        const res = await fetch('/api/briefs')
        if (res.ok) {
          const data = await res.json()
          setBriefs(data)
        }
      } catch (err) {
        console.error('Failed to fetch briefs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBriefs()
  }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/portal" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">All Briefs</h1>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search briefs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="sent">New</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading briefs...</div>
      ) : filteredBriefs.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600">No briefs found</p>
          {searchTerm && <p className="text-sm text-gray-500">Try adjusting your search</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBriefs.map((brief) => (
            <Link
              key={brief.id}
              href={`/portal/briefs/${brief.id}`}
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{brief.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(brief.status)}`}>
                      {brief.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-1">{brief.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="capitalize">{brief.type}</span>
                    {brief.dueDate && (
                      <span>Due {new Date(brief.dueDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
