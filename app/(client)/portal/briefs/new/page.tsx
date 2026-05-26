'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './brief-form.module.css'

interface PurchaseData {
  productId: string
  productName: string
  category: string
  price: number
  purchaseDate: string
  orderId: string
}

interface FormData {
  briefTitle: string
  projectDescription: string
  brandName: string
  targetAudience: string
  designPreferences: string
  timeline: string
  budget: string
  additionalNotes: string
  attachments: File[]
}

function NewBriefContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [purchase, setPurchase] = useState<PurchaseData | null>(null)
  const [formData, setFormData] = useState<FormData>({
    briefTitle: '',
    projectDescription: '',
    brandName: '',
    targetAudience: '',
    designPreferences: '',
    timeline: 'standard',
    budget: '',
    additionalNotes: '',
    attachments: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Get purchase data from URL params (passed from checkout/shop)
    const orderId = searchParams.get('orderId')
    const productName = searchParams.get('product')
    const category = searchParams.get('category')
    const price = searchParams.get('price')

    if (orderId && productName) {
      setPurchase({
        orderId,
        productName,
        category: category || 'design-service',
        price: parseFloat(price || '0'),
        purchaseDate: new Date().toISOString(),
        productId: searchParams.get('productId') || '',
      })

      // Auto-populate brief title from product
      setFormData((prev) => ({
        ...prev,
        briefTitle: `${productName} — Design Brief`,
      }))
    }
  }, [searchParams])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        attachments: Array.from(e.target.files || []),
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.briefTitle.trim()) {
      newErrors.briefTitle = 'Brief title is required'
    }
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    }
    if (!formData.brandName.trim()) {
      newErrors.brandName = 'Brand name is required'
    }
    if (!formData.targetAudience.trim()) {
      newErrors.targetAudience = 'Target audience is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('briefTitle', formData.briefTitle)
      submitData.append('projectDescription', formData.projectDescription)
      submitData.append('brandName', formData.brandName)
      submitData.append('targetAudience', formData.targetAudience)
      submitData.append('designPreferences', formData.designPreferences)
      submitData.append('timeline', formData.timeline)
      submitData.append('budget', formData.budget)
      submitData.append('additionalNotes', formData.additionalNotes)

      if (purchase) {
        submitData.append('orderId', purchase.orderId)
        submitData.append('productName', purchase.productName)
      }

      // Append files
      formData.attachments.forEach((file) => {
        submitData.append('files', file)
      })

      const res = await fetch('/api/briefs', {
        method: 'POST',
        body: submitData,
      })

      if (!res.ok) {
        throw new Error('Failed to create brief')
      }

      const result = await res.json()
      setSuccess(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/portal/briefs/${result.id}`)
      }, 2000)
    } catch (error) {
      setErrors({ submit: 'Failed to submit brief. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Brief Created</h2>
          <p className={styles.successText}>
            Your design brief has been submitted. Our team will review it shortly.
          </p>
          <div className={styles.loadingDots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Header Grid */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            <span>New Brief</span>
            {purchase && <span className={styles.badge}>{purchase.productName}</span>}
          </div>
          <h1 className={styles.title}>Design Brief Form</h1>
          <p className={styles.subtitle}>
            Tell us everything about your project. The more detail, the better the design.
          </p>
        </div>
      </div>

      {/* Purchase Info Card */}
      {purchase && (
        <div className={styles.purchaseCard}>
          <div className={styles.purchaseInfo}>
            <div className={styles.purchaseLabel}>Order Info</div>
            <div className={styles.purchaseDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Product:</span>
                <span className={styles.detailValue}>{purchase.productName}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Order ID:</span>
                <span className={styles.detailValue}>{purchase.orderId}</span>
              </div>
            </div>
          </div>
          <div className={styles.purchaseAmount}>
            <div className={styles.amountLabel}>Investment</div>
            <div className={styles.amountValue}>€{purchase.price.toFixed(2)}</div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Error Summary */}
        {errors.submit && (
          <div className={styles.errorBanner}>
            <span>⚠️</span>
            <span>{errors.submit}</span>
          </div>
        )}

        {/* Section 1: Brief Basics */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>01. Brief Basics</h2>
          <p className={styles.sectionDescription}>Core information about your design project</p>

          <div className={styles.formGroup}>
            <label htmlFor="briefTitle" className={styles.label}>
              Brief Title
              <span className={styles.required}>*</span>
            </label>
            <input
              id="briefTitle"
              name="briefTitle"
              type="text"
              placeholder="e.g., Complete Brand Identity for TechStartup"
              value={formData.briefTitle}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.briefTitle ? styles.inputError : ''}`}
            />
            {errors.briefTitle && <span className={styles.errorText}>{errors.briefTitle}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="brandName" className={styles.label}>
              Brand / Company Name
              <span className={styles.required}>*</span>
            </label>
            <input
              id="brandName"
              name="brandName"
              type="text"
              placeholder="Your brand name"
              value={formData.brandName}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.brandName ? styles.inputError : ''}`}
            />
            {errors.brandName && <span className={styles.errorText}>{errors.brandName}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="projectDescription" className={styles.label}>
                Project Description
                <span className={styles.required}>*</span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                rows={5}
                placeholder="Describe your project in detail. What are we designing? What's the context?"
                value={formData.projectDescription}
                onChange={handleInputChange}
                className={`${styles.textarea} ${errors.projectDescription ? styles.inputError : ''}`}
              />
              {errors.projectDescription && (
                <span className={styles.errorText}>{errors.projectDescription}</span>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Target & Preferences */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>02. Audience & Design Direction</h2>
          <p className={styles.sectionDescription}>Who are we designing for and what's your vision</p>

          <div className={styles.formGroup}>
            <label htmlFor="targetAudience" className={styles.label}>
              Target Audience
              <span className={styles.required}>*</span>
            </label>
            <input
              id="targetAudience"
              name="targetAudience"
              type="text"
              placeholder="e.g., Tech-savvy millennials, Creative professionals, etc."
              value={formData.targetAudience}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.targetAudience ? styles.inputError : ''}`}
            />
            {errors.targetAudience && (
              <span className={styles.errorText}>{errors.targetAudience}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="designPreferences" className={styles.label}>
              Design Preferences & Inspiration
            </label>
            <textarea
              id="designPreferences"
              name="designPreferences"
              rows={4}
              placeholder="Style preferences, color palette ideas, design references, mood board links, etc."
              value={formData.designPreferences}
              onChange={handleInputChange}
              className={styles.textarea}
            />
          </div>
        </div>

        {/* Section 3: Project Details */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>03. Project Timeline & Budget</h2>
          <p className={styles.sectionDescription}>When do you need this and what's your budget range</p>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="timeline" className={styles.label}>
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="urgent">Urgent (1-2 weeks)</option>
                <option value="standard">Standard (2-4 weeks)</option>
                <option value="flexible">Flexible (4+ weeks)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="budget" className={styles.label}>
                Budget Range
              </label>
              <input
                id="budget"
                name="budget"
                type="text"
                placeholder="e.g., €2000 - €5000"
                value={formData.budget}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Attachments & Notes */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>04. References & Additional Info</h2>
          <p className={styles.sectionDescription}>Share files, links, and any other important details</p>

          <div className={styles.formGroup}>
            <label htmlFor="attachments" className={styles.label}>
              Attachments (Optional)
            </label>
            <div className={styles.fileUpload}>
              <input
                id="attachments"
                type="file"
                multiple
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <div className={styles.fileUploadContent}>
                <div className={styles.fileUploadIcon}>📎</div>
                <div className={styles.fileUploadText}>
                  <p className={styles.fileUploadMain}>
                    {formData.attachments.length > 0
                      ? `${formData.attachments.length} file(s) selected`
                      : 'Click to upload or drag files'}
                  </p>
                  <p className={styles.fileUploadSub}>PNG, JPG, PDF, ZIP up to 50MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="additionalNotes" className={styles.label}>
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              placeholder="Anything else we should know? Questions? Specific requirements?"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              className={styles.textarea}
            />
          </div>
        </div>

        {/* Submit Section */}
        <div className={styles.submitSection}>
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${isLoading ? styles.submitButtonLoading : ''}`}
          >
            <span className={styles.submitButtonText}>
              {isLoading ? 'Submitting...' : 'Submit Brief'}
            </span>
            {!isLoading && <span className={styles.submitButtonArrow}>→</span>}
          </button>
          <p className={styles.submitHelp}>
            Your brief will be reviewed by our team within 24 hours
          </p>
        </div>
      </form>

      {/* Footer Grid */}
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <p>Need help? <a href="/contacto" className={styles.footerLink}>Contact our team</a></p>
          <p>View your <a href="/portal/briefs" className={styles.footerLink}>submitted briefs</a></p>
        </div>
      </div>
    </div>
  )
}

export default function NewBriefPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>}>
      <NewBriefContent />
    </Suspense>
  )
}
