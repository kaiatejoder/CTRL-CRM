'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, FileText, Send, Check } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Brief {
  id: string
  title: string
  description: string
  type: string
  status: string
  dueDate: string | null
  createdAt: string
  responses?: BriefResponse[]
}

interface BriefResponse {
  id: string
  data: Record<string, unknown>
  submittedAt: string
}

export default function BriefDetailPage() {
  const params = useParams()
  const briefId = params.id as string

  const [brief, setBrief] = useState<Brief | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBrief() {
      try {
        const res = await fetch(`/api/briefs/${briefId}`)
        if (res.ok) {
          const data = await res.json()
          setBrief(data)
          setSubmitted(!!data.responses?.length)
        }
      } catch (err) {
        setError('Failed to load brief')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBrief()
  }, [briefId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(`/api/briefs/${briefId}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData }),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({})
      } else {
        setError('Failed to submit response')
      }
    } catch (err) {
      setError('An error occurred while submitting')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading brief...</div>
  }

  if (!brief) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Brief not found</p>
        <Link href="/portal/briefs" className="text-blue-600 hover:text-blue-700">
          Back to briefs
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/portal/briefs" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{brief.title}</h1>
          <p className="text-gray-600 mt-1">{brief.type}</p>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
            {brief.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Brief Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Brief Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{brief.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600 mb-1">Created</p>
            <p className="font-medium text-gray-900">
              {new Date(brief.createdAt).toLocaleDateString()}
            </p>
          </div>
          {brief.dueDate && (
            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Calendar size={16} />
                Due Date
              </p>
              <p className="font-medium text-gray-900">
                {new Date(brief.dueDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Response Status or Form */}
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-4">
          <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-green-900">Response Submitted</h3>
            <p className="text-green-700 text-sm mt-1">
              Your response has been successfully submitted. You can edit your response anytime before
              the due date.
            </p>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Your Response
              </label>
              <textarea
                value={formData.response || ''}
                onChange={(e) => setFormData({ ...formData, response: e.target.value })}
                placeholder="Enter your response to this brief..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting...' : <>
                <Send size={18} />
                Submit Response
              </>}
            </button>
          </form>
        </>
      )}

      {/* Additional Resources */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText size={18} />
          Resources
        </h3>
        <p className="text-gray-600 text-sm">
          If you have any questions about this brief, please contact your account manager or reply to your
          invitation email.
        </p>
      </div>
    </div>
  )
}
