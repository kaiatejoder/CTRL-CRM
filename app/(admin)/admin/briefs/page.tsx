'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Plus, Eye, Send } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Brief {
  id: string
  title: string
  type: string
  status: string
  clientId: string
  dueDate: string | null
  createdAt: string
  _count?: {
    responses: number
  }
}

interface Client {
  id: string
  name: string
  email: string
}

export default function BriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [clients, setClients] = useState<Record<string, Client>>({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [reloadKey, setReloadKey] = useState(0)

  const filteredBriefs = useMemo(() => {
    let filtered = briefs
    if (searchTerm) {
      filtered = filtered.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        const [briefsRes, clientsRes] = await Promise.all([
          fetch('/api/admin/briefs'),
          fetch('/api/admin/clients'),
        ])

        if (briefsRes.ok) {
          const briefsData = await briefsRes.json()
          setBriefs(briefsData)
        }

        if (clientsRes.ok) {
          const clientsData = await clientsRes.json()
          const clientsMap = clientsData.reduce((acc: Record<string, Client>, c: Client) => {
            acc[c.id] = c
            return acc
          }, {})
          setClients(clientsMap)
        }
      } catch (err) {
        console.error('Failed to fetch briefs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBriefs()
  }, [reloadKey])

  const sendBrief = async (briefId: string, clientId: string) => {
    try {
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ briefId, clientId }),
      })

      if (res.ok) {
        setReloadKey((k) => k + 1)
      }
    } catch (err) {
      console.error('Failed to send brief:', err)
    }
  }

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Briefs</h1>
          <p className="text-gray-600 mt-1">Manage all project briefs</p>
        </div>
        <Link
          href="/admin/briefs/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Create Brief
        </Link>
      </div>

      {/* Filters */}
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Briefs Table */}
      {loading ? (
        <div className="text-center py-12">Loading briefs...</div>
      ) : filteredBriefs.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600">No briefs found</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Client</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Responses</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBriefs.map((brief) => (
                <tr key={brief.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900 max-w-xs truncate">
                    {brief.title}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {clients[brief.clientId]?.name || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-gray-600 capitalize">{brief.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(brief.status)}`}>
                      {brief.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{brief._count?.responses || 0}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {brief.dueDate ? new Date(brief.dueDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <Link
                      href={`/admin/briefs/${brief.id}`}
                      className="text-gray-600 hover:text-gray-900 p-1"
                      title="View"
                    >
                      <Eye size={16} />
                    </Link>
                    {brief.status === 'draft' && (
                      <button
                        onClick={() => sendBrief(brief.id, brief.clientId)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Send"
                      >
                        <Send size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
