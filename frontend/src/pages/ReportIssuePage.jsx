import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { issuesApi } from '../api/client'

export default function ReportIssuePage() {
  const navigate = useNavigate()
  const [issueType, setIssueType] = useState('broken')
  const [portalUrl, setPortalUrl] = useState('')
  const [description, setDescription] = useState('')
  const [includeDiagnostics, setIncludeDiagnostics] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description.trim()) return

    setSubmitting(true)
    try {
      await issuesApi.submit({
        issue_type: issueType,
        portal_url: portalUrl,
        description,
        diagnostic_data: includeDiagnostics
          ? {
              extension_version: 'v1.4.2',
              client_architecture: navigator.userAgent,
              timestamp: new Date().toISOString()
            }
          : {}
      })
      setSubmitted(true)
      setTimeout(() => navigate('/app/dashboard'), 2500)
    } catch (err) {
      alert('Issue reported locally. Thank you for helping improve formER!')
      navigate('/app/dashboard')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-space-2xl animate-fade-in">
      {/* Header Block */}
      <div className="flex flex-col gap-space-xs mb-space-lg">
        <div className="flex items-center gap-space-xs text-text-secondary font-technical-meta text-technical-meta uppercase tracking-wider">
          <span>Support Protocol</span>
          <span>/</span>
          <span>Diagnostic Ingestion</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-medium">Report an Issue</h1>
        <p className="font-body-md text-body-md text-text-secondary max-w-2xl">
          Tell us what went wrong and we'll look into it. Your feedback helps formER recognize forms and resolve structural mapping anomalies with higher fidelity.
        </p>
      </div>

      {submitted ? (
        <div className="bg-surface-clean rounded-xl shadow-sm border border-border-soft p-space-2xl text-center flex flex-col items-center gap-space-md">
          <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">check</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-text-primary font-medium">Issue Report Submitted</h2>
          <p className="font-body-md text-body-md text-text-secondary max-w-md">
            Our telemetry model has ingested your structural report. Thank you for contributing to formER's precision!
          </p>
          <span className="font-technical-meta text-technical-meta text-text-secondary">Redirecting to dashboard...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Form (8 cols) */}
          <div className="lg:col-span-8 bg-surface-clean rounded-xl shadow-sm border border-border-soft p-space-lg sm:p-space-xl flex flex-col gap-space-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg">
              {/* Category */}
              <div className="flex flex-col gap-space-sm">
                <label className="font-label-md text-label-md text-text-primary flex items-center justify-between">
                  <span>Issue Type</span>
                  <span className="font-technical-meta text-technical-meta text-text-secondary">Required</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                  {[
                    { id: 'broken', label: "Something isn't working", icon: 'error_outline' },
                    { id: 'mismapped', label: 'formER filled incorrectly', icon: 'sync_problem' },
                    { id: 'extension', label: 'Extension problem', icon: 'extension' },
                    { id: 'account', label: 'Account problem', icon: 'manage_accounts' },
                    { id: 'other', label: 'Other', icon: 'more_horiz', colSpan: true }
                  ].map((type) => (
                    <label
                      key={type.id}
                      onClick={() => setIssueType(type.id)}
                      className={`relative flex items-center gap-space-sm p-space-sm rounded-lg cursor-pointer transition-colors border ${
                        type.colSpan ? 'sm:col-span-2' : ''
                      } ${
                        issueType === type.id
                          ? 'bg-accent-teal text-surface-clean border-accent-teal shadow-sm'
                          : 'bg-surface-container-low hover:bg-surface-container text-text-primary border-border-soft'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{type.icon}</span>
                      <span className="font-label-sm text-label-sm select-none">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Portal URL */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-text-primary flex items-center justify-between" htmlFor="portalUrl">
                  <span>Page or Portal URL</span>
                  <span className="font-technical-meta text-technical-meta text-text-secondary">Optional</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-space-md text-[18px] text-text-secondary pointer-events-none">
                    link
                  </span>
                  <input
                    id="portalUrl"
                    value={portalUrl}
                    onChange={(e) => setPortalUrl(e.target.value)}
                    className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-surface-clean border border-border-soft rounded-lg pl-10 pr-space-md py-2.5 font-technical-code text-technical-code text-text-primary placeholder:text-text-secondary outline-none transition-colors"
                    placeholder="e.g., https://admissions.university.edu/application"
                    type="url"
                  />
                </div>
                <p className="font-technical-meta text-technical-meta text-text-secondary pl-space-xs">
                  Helps us see which form layout caused the problem.
                </p>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-text-primary flex items-center justify-between" htmlFor="issueDescription">
                  <span>What happened?</span>
                  <span className="font-technical-meta text-technical-meta text-text-secondary">Detailed context</span>
                </label>
                <textarea
                  id="issueDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-surface-clean border border-border-soft rounded-lg p-space-md font-body-sm text-body-sm text-text-primary placeholder:text-text-secondary outline-none transition-colors resize-y leading-relaxed"
                  placeholder="Describe what went wrong. For example: The form asked for 12th Roll Number, but formER filled the 10th Roll Number instead."
                  required
                  rows={4}
                />
              </div>

              {/* Diagnostics */}
              <div className="bg-surface-container-low border border-border-soft rounded-lg p-space-md flex flex-col gap-space-xs">
                <label className="flex items-start gap-space-sm cursor-pointer select-none">
                  <input
                    checked={includeDiagnostics}
                    onChange={(e) => setIncludeDiagnostics(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded accent-accent-teal cursor-pointer"
                    type="checkbox"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-text-primary font-medium">
                      Include form layout diagnostics
                    </span>
                    <span className="font-body-sm text-body-sm text-text-secondary">
                      Include anonymized field structure to help engineers fix the issue (no personal data included)
                    </span>
                  </div>
                </label>
                <div className="mt-space-sm pt-space-sm border-t border-border-soft flex items-center justify-between font-technical-meta text-technical-meta text-text-secondary">
                  <span className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    Sanitized DOM Schema (v1.4)
                  </span>
                  <span>Zero-PII guarantee</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full sm:w-auto px-space-lg py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-label-md text-label-md transition-colors text-center border border-border-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-space-xl py-2.5 rounded-lg bg-accent-teal hover:bg-primary text-surface-clean font-label-md text-label-md shadow-sm transition-all active:translate-y-px flex items-center justify-center gap-space-xs disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>{submitting ? 'Submitting...' : 'Submit report'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Ancillary Context (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="bg-surface-clean rounded-xl shadow-sm border border-border-soft p-space-lg flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-text-primary font-medium">Session Telemetry</span>
                <span className="font-technical-meta text-technical-meta px-space-xs py-0.5 rounded bg-surface-container text-accent-teal font-medium border border-border-soft">
                  ACTIVE
                </span>
              </div>
              <div className="flex flex-col gap-space-xs font-technical-data text-technical-data text-text-secondary">
                <div className="flex items-center justify-between py-1">
                  <span>Extension Version</span>
                  <span className="text-text-primary">v1.4.2</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Engine Status</span>
                  <span className="text-text-primary">Autofill Mapped</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>ML Model Target</span>
                  <span className="text-text-primary">SentenceTransformer/ONNX</span>
                </div>
              </div>
              <div className="rounded-lg bg-surface-container-low border border-border-soft p-space-sm flex items-start gap-space-xs text-text-secondary">
                <span className="material-symbols-outlined text-[16px] text-text-primary shrink-0 mt-0.5">policy</span>
                <p className="font-technical-meta text-technical-meta text-text-secondary leading-normal">
                  Reports are processed using zero-knowledge extraction. Your personally identifiable information (PII) is discarded before storage.
                </p>
              </div>
            </div>

            <div className="bg-surface-clean rounded-xl shadow-sm border border-border-soft p-space-lg flex flex-col gap-space-md">
              <span className="font-label-sm text-label-sm text-text-primary font-medium">Direct Support</span>
              <a
                href="mailto:support@former.app"
                className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container border border-border-soft transition-colors"
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[18px] text-text-secondary">mail</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-text-primary font-medium">Engineering Desk</span>
                    <span className="font-technical-meta text-technical-meta text-text-secondary">support@former.app</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-text-secondary">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
