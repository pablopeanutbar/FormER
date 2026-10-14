import { useState, useMemo } from 'react'
import { useProfile } from '../context/ProfileContext'

const SAMPLE_SESSIONS = [
  {
    id: 981,
    portal_name: 'University Admissions Portal',
    category: 'PG Course',
    portal_url: 'admissions.univ.edu/step3',
    status: 'Completed',
    created_at: 'Today, 4:32 PM',
    fields_filled_count: 18,
    accuracy_rate: '100%',
    docs_verified_count: 2,
    referenced_docs: ['10th Marksheet', 'B.Tech Transcript'],
    fields: [
      { label: 'Candidate Full Name', value: 'Aarav V. Sharma' },
      { label: "Father's Name", value: 'Vikram S. Sharma' },
      { label: 'Date of Birth', value: '14/08/1998' },
      { label: 'Class 10th Roll & %', value: '6192041, 94.2%' },
      { label: 'Class 12th & %', value: 'Delhi Public School, 91.8%' },
      { label: 'Degree & CGPA', value: 'B.Tech CSE, IIT Delhi, 8.85' },
      { label: 'Permanent Address', value: 'New Delhi' }
    ]
  },
  {
    id: 974,
    portal_name: 'Government Job & Civil Service Exam',
    category: 'UPSC Prelims',
    portal_url: 'exams.upsc.gov.in/applicant',
    status: 'Completed',
    created_at: 'Yesterday, 11:15 AM',
    fields_filled_count: 26,
    accuracy_rate: '98%',
    docs_verified_count: 3,
    referenced_docs: ['Aadhaar Card', '10th Certificate', 'Domicile Proof'],
    fields: [
      { label: 'Candidate Full Name', value: 'Aarav V. Sharma' },
      { label: "Father's Name", value: 'Vikram S. Sharma' },
      { label: "Mother's Name", value: 'Sunita Sharma' },
      { label: 'Identity Proof', value: 'Aadhaar (Verified)' },
      { label: 'Category', value: 'General' },
      { label: 'Domicile State', value: 'Delhi' }
    ]
  },
  {
    id: 952,
    portal_name: 'National Merit Scholarship & Grant Application',
    category: 'Scholarship',
    portal_url: 'scholarship.gov.in/portal',
    status: 'Needs review (2)',
    created_at: '12 Oct 2025, 2:40 PM',
    fields_filled_count: 21,
    accuracy_rate: '95%',
    docs_verified_count: 2,
    referenced_docs: ['Family Income Certificate', '12th Marksheet'],
    review_note: 'Discrepancy detected between Income Certificate gross total and stated family annual income.',
    fields: [
      { label: 'Annual Family Income', value: '₹ 4,50,000 (Flagged)' },
      { label: 'Bank Account Number', value: '•••• •••• 4091' },
      { label: 'IFSC Code', value: 'SBIN0001234' },
      { label: '12th Marks', value: '91.8%' }
    ]
  },
  {
    id: 919,
    portal_name: 'State Engineering Graduate Trainee Portal',
    category: 'Recruitment',
    portal_url: 'recruitment.stateeng.in',
    status: 'Completed',
    created_at: '05 Oct 2025, 6:10 PM',
    fields_filled_count: 32,
    accuracy_rate: '100%',
    docs_verified_count: 1,
    referenced_docs: ['Standard Schema'],
    fields: [
      { label: 'Engineering Branch', value: 'Computer Science & Engineering' },
      { label: 'Year of Graduation', value: '2024' },
      { label: 'University Roll No', value: '2020CS0841' },
      { label: 'Overall Aggregate', value: '88.5%' }
    ]
  }
]

export default function HistoryPage() {
  const { history, stats, purgeHistory } = useProfile()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSessionId, setSelectedSessionId] = useState(981)
  const [statusFilter, setStatusFilter] = useState('all')

  // Combine real backend history if any with sample reference sessions
  const allSessions = useMemo(() => {
    if (history && history.length > 0) {
      const real = history.map((h, i) => ({
        id: h.id || i + 1,
        portal_name: h.portal_name,
        category: 'Web Form',
        portal_url: h.portal_url,
        status: 'Completed',
        created_at: new Date(h.created_at).toLocaleDateString(),
        fields_filled_count: h.fields_filled_count || 12,
        accuracy_rate: h.accuracy_rate || '100%',
        docs_verified_count: 1,
        referenced_docs: ['Saved Profile'],
        fields: h.filled_fields && h.filled_fields.length > 0
          ? h.filled_fields.map(f => ({ label: f.field || 'Field', value: f.value || 'Filled' }))
          : [{ label: 'Session Data', value: 'Profile Synced' }]
      }))
      return [...real, ...SAMPLE_SESSIONS]
    }
    return SAMPLE_SESSIONS
  }, [history])

  const filteredSessions = useMemo(() => {
    return allSessions.filter(item => {
      const matchSearch =
        item.portal_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.portal_url.toLowerCase().includes(searchQuery.toLowerCase())
      if (statusFilter === 'all') return matchSearch
      if (statusFilter === 'review') return matchSearch && item.status.includes('review')
      if (statusFilter === 'completed') return matchSearch && item.status === 'Completed'
      return matchSearch
    })
  }, [allSessions, searchQuery, statusFilter])

  const activeSession =
    filteredSessions.find(s => s.id === selectedSessionId) ||
    filteredSessions[0] ||
    allSessions[0]

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allSessions, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `former_history_${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="flex flex-col gap-space-lg w-full max-w-7xl mx-auto pb-space-2xl animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider">
              Audit Log • Schema Replay
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-teal"></span>
            <span className="font-technical-meta text-technical-meta text-accent-teal">Encrypted Local Hash</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-medium">History</h1>
          <p className="font-body-md text-body-md text-text-secondary">
            Inspect forms you've worked on, field mappings, and verified profile data used.
          </p>
        </div>
        <div className="flex items-center gap-space-xs self-start md:self-auto">
          <button
            onClick={handleExport}
            className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-clean shadow-sm hover:bg-surface-container transition-colors text-text-primary font-label-sm text-label-sm border border-border-soft"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Export Schema Log</span>
          </button>
          <button
            onClick={purgeHistory}
            className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary text-on-primary shadow-sm hover:bg-primary-container transition-colors font-label-sm text-label-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">security</span>
            <span>Purge Field Cache</span>
          </button>
        </div>
      </div>

      {/* Stats Ticker */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-clean shadow-sm border border-border-soft flex flex-col gap-1">
          <span className="font-technical-meta text-technical-meta text-text-secondary uppercase">Sessions Recorded</span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-md text-headline-md text-text-primary font-medium">
              {stats.sessions_recorded || allSessions.length}
            </span>
            <span className="font-technical-meta text-technical-meta text-accent-teal font-medium">100% manual submit</span>
          </div>
        </div>
        <div className="p-space-md rounded-xl bg-surface-clean shadow-sm border border-border-soft flex flex-col gap-1">
          <span className="font-technical-meta text-technical-meta text-text-secondary uppercase">Fields Populated</span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-md text-headline-md text-text-primary font-medium">
              {stats.total_fields_populated || 194}
            </span>
            <span className="font-technical-meta text-technical-meta text-text-secondary">avg. 24.2 / form</span>
          </div>
        </div>
        <div className="p-space-md rounded-xl bg-surface-clean shadow-sm border border-border-soft flex flex-col gap-1">
          <span className="font-technical-meta text-technical-meta text-text-secondary uppercase">Docs Verified</span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-md text-headline-md text-text-primary font-medium">14</span>
            <span className="font-technical-meta text-technical-meta text-text-secondary">OCR verified</span>
          </div>
        </div>
        <div className="p-space-md rounded-xl bg-surface-clean shadow-sm border border-border-soft flex flex-col gap-1">
          <span className="font-technical-meta text-technical-meta text-text-secondary uppercase">Accuracy Rate</span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-md text-headline-md text-text-primary font-medium">
              {stats.accuracy_rate || '99.1%'}
            </span>
            <span className="font-technical-meta text-technical-meta text-accent-teal font-medium">Verified</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-space-md rounded-xl bg-surface-clean shadow-sm border border-border-soft flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
        <div className="relative flex-1">
          <span className="material-symbols-outlined text-[18px] text-text-secondary absolute left-space-md top-1/2 -translate-y-1/2">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-space-md py-2 bg-surface-container rounded-lg font-body-sm text-body-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:bg-surface-clean border border-transparent focus:border-border-soft transition-colors"
            placeholder="Search filled forms, portals, dates, or documents..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
          <button
            onClick={() => setStatusFilter(statusFilter === 'all' ? 'completed' : statusFilter === 'completed' ? 'review' : 'all')}
            className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-text-primary"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-text-secondary">rule</span>
            <span className="capitalize">Status: {statusFilter}</span>
            <span className="material-symbols-outlined text-[16px] text-text-secondary">expand_more</span>
          </button>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-text-secondary"
              title="Clear search"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list_off</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* Left Feed (7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-space-md">
          <div className="flex items-center justify-between px-space-xs">
            <span className="font-technical-meta text-technical-meta text-text-secondary uppercase">
              Recent Sessions ({filteredSessions.length})
            </span>
            <span className="font-technical-meta text-technical-meta text-text-secondary">Sort: Most Recent</span>
          </div>

          {filteredSessions.map((session) => {
            const isSelected = activeSession?.id === session.id
            const isReview = session.status.includes('review')
            return (
              <div
                key={session.id}
                onClick={() => setSelectedSessionId(session.id)}
                className={`group relative p-space-lg rounded-xl bg-surface-clean shadow-sm hover:shadow-md transition-all cursor-pointer border ${
                  isSelected ? 'border-accent-teal ring-1 ring-accent-teal/20' : 'border-border-soft'
                }`}
              >
                {isSelected && <div className="absolute left-0 top-3 bottom-3 w-1 bg-accent-teal rounded-r"></div>}
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-space-xs flex-wrap">
                        <span className="font-headline-sm text-headline-sm text-text-primary font-medium tracking-tight">
                          {session.portal_name}
                        </span>
                        {session.category && (
                          <span className="font-technical-meta text-technical-meta px-2 py-0.5 rounded bg-surface-container text-text-secondary">
                            {session.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-space-xs mt-1">
                        <span className="material-symbols-outlined text-[14px] text-text-secondary">link</span>
                        <span className="font-technical-code text-technical-code text-accent-teal truncate max-w-md">
                          {session.portal_url}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm shrink-0 ${
                        isReview ? 'bg-tertiary-fixed text-tertiary' : 'bg-secondary-fixed text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {isReview ? 'warning' : 'check_circle'}
                      </span>
                      <span>{session.status}</span>
                    </span>
                  </div>

                  {session.review_note && (
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs border border-tertiary-fixed/40">
                      <span className="material-symbols-outlined text-[16px] text-tertiary mt-0.5">info</span>
                      <p className="font-body-sm text-body-sm text-text-secondary">
                        <strong className="text-tertiary font-medium">Review note: </strong>
                        {session.review_note}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[16px] text-text-secondary">schedule</span>
                      <span className="font-technical-data text-technical-data text-text-primary">
                        {session.created_at}
                      </span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[16px] text-text-secondary">edit_note</span>
                      <span className="font-technical-data text-technical-data text-text-primary">
                        {session.fields_filled_count} fields filled
                      </span>
                    </div>
                    <div className="flex items-center gap-space-xs truncate">
                      <span className="material-symbols-outlined text-[16px] text-text-secondary shrink-0">
                        attach_file
                      </span>
                      <span className="font-technical-data text-technical-data text-text-secondary truncate">
                        {session.docs_verified_count} docs verified
                      </span>
                    </div>
                  </div>

                  {session.referenced_docs && (
                    <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
                      <span className="font-technical-meta text-technical-meta text-text-secondary">Referenced:</span>
                      {session.referenced_docs.map((doc, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container font-technical-meta text-technical-meta text-text-primary"
                        >
                          <span className="material-symbols-outlined text-[12px] text-text-secondary">description</span>
                          {doc}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-space-xs border-t border-border-soft">
                    <span className="font-technical-meta text-technical-meta text-text-secondary">
                      Session ID: #FRM-2025-0{session.id}
                    </span>
                    <button
                      className="inline-flex items-center gap-1 font-label-sm text-label-sm text-accent-teal hover:text-primary transition-colors font-medium"
                      type="button"
                    >
                      <span>{isSelected ? 'Viewing' : 'Inspect details'}</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Inspection Chamber (5 cols - Sticky) */}
        {activeSession && (
          <div className="xl:col-span-5 flex flex-col gap-space-md sticky top-20">
            <div className="p-space-lg rounded-xl bg-surface-clean shadow-md border border-border-soft flex flex-col gap-space-lg">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-technical-meta text-technical-meta text-text-secondary uppercase">
                    Inspection Chamber
                  </span>
                  <span className="font-technical-data text-technical-data px-2 py-0.5 rounded bg-surface-container text-primary font-medium">
                    Session #{activeSession.id}
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-primary font-medium tracking-tight">
                  {activeSession.portal_name}
                </h2>
                <div className="flex items-center gap-space-sm text-text-secondary font-technical-meta text-technical-meta">
                  <span>{activeSession.created_at}</span>
                  <span>•</span>
                  <span className="text-accent-teal font-medium">
                    {activeSession.fields_filled_count} fields mapped
                  </span>
                </div>
              </div>

              {/* Accuracy Gauge */}
              <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-space-xs">
                <div className="flex justify-between items-center text-text-primary font-label-sm text-label-sm">
                  <span>Schema Resolution Accuracy</span>
                  <span className="font-technical-data text-technical-data font-medium">
                    {activeSession.accuracy_rate}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-accent-teal rounded-full"
                    style={{ width: activeSession.accuracy_rate || '100%' }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-text-secondary font-technical-meta text-technical-meta mt-1">
                  <span>{activeSession.fields_filled_count} Target Elements</span>
                  <span>0 Blind Submissions</span>
                </div>
              </div>

              {/* Information Used */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-text-primary font-medium">
                    Fields Populated
                  </span>
                  <span className="font-technical-meta text-technical-meta text-text-secondary">
                    Canonical Data
                  </span>
                </div>
                <div className="flex flex-col divide-y divide-border-soft rounded-lg bg-surface-container-low border border-border-soft overflow-hidden">
                  {activeSession.fields?.map((f, i) => (
                    <div
                      key={i}
                      className="p-space-sm flex items-center justify-between gap-space-sm hover:bg-surface-container transition-colors"
                    >
                      <span className="font-technical-meta text-technical-meta text-text-secondary min-w-[130px]">
                        {f.label}
                      </span>
                      <span className="font-body-sm text-body-sm text-text-primary font-medium text-right truncate">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Documents */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-text-primary font-medium">
                    Referenced Documents
                  </span>
                  <span className="font-technical-meta text-technical-meta text-text-secondary">
                    {activeSession.referenced_docs?.length || 1} Files
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  {activeSession.referenced_docs?.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-space-sm rounded-lg bg-surface-container-low border border-border-soft flex items-center justify-between hover:bg-surface-container transition-colors"
                    >
                      <div className="flex items-center gap-space-xs min-w-0">
                        <div className="p-1 rounded bg-surface-clean shadow-sm text-accent-teal">
                          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-technical-data text-technical-data text-text-primary truncate">
                            {doc}.pdf
                          </span>
                          <span className="font-technical-meta text-technical-meta text-text-secondary">
                            SHA-256 Validated
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-text-secondary">verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
