import { Link } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'

export default function DashboardPage() {
  const { user, profile, stats, history } = useProfile()
  const displayName = user?.name || profile?.personal_data?.full_name || 'User'

  // Display recent history items or fallback to sample previews if brand new
  const recentHistory = history && history.length > 0 ? history.slice(0, 5) : [
    {
      id: 'demo-1',
      portal_name: 'University Admissions Portal',
      portal_url: 'admissions.univ.edu',
      fields_filled_count: 18,
      created_at: 'Today, 4:32 PM'
    },
    {
      id: 'demo-2',
      portal_name: 'UPSC Civil Services Portal',
      portal_url: 'exams.upsc.gov.in',
      fields_filled_count: 26,
      created_at: 'Yesterday, 11:15 AM'
    }
  ]

  return (
    <div className="flex flex-col w-full animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* LEFT COLUMN: Main Feed (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-space-lg">
          {/* Hero Welcome Box */}
          <div className="bg-surface-clean rounded-xl p-space-lg border border-border-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md shadow-sm">
            <div>
              <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight">
                Welcome back, {displayName}
              </h1>
              <p className="font-body-md text-body-md text-text-secondary mt-1 max-w-xl">
                formER is standing by. Your profile vault is synchronized and ready for intelligent autofill.
              </p>
            </div>
            <Link
              to="/app/my-information"
              className="inline-flex items-center gap-space-xs px-space-md py-2 bg-accent-teal hover:bg-primary text-surface-clean font-label-md text-label-md rounded-lg transition-colors active:translate-y-[1px] shadow-sm whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Update Vault</span>
            </Link>
          </div>

          {/* Quick Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div className="bg-surface-clean rounded-xl p-space-md border border-border-soft shadow-sm hover:border-accent-teal/30 transition-colors">
              <div className="flex items-center gap-space-xs text-text-secondary mb-2">
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
                <span className="font-technical-meta text-technical-meta uppercase tracking-wider">
                  Forms Filled
                </span>
              </div>
              <div className="font-headline-lg text-headline-lg text-text-primary font-semibold">
                {stats?.forms_filled || 0}
              </div>
              <div className="font-technical-data text-technical-data text-accent-teal mt-1">
                Active sessions
              </div>
            </div>
            <div className="bg-surface-clean rounded-xl p-space-md border border-border-soft shadow-sm hover:border-accent-teal/30 transition-colors">
              <div className="flex items-center gap-space-xs text-text-secondary mb-2">
                <span className="material-symbols-outlined text-[18px]">timer</span>
                <span className="font-technical-meta text-technical-meta uppercase tracking-wider">
                  Time Saved
                </span>
              </div>
              <div className="font-headline-lg text-headline-lg text-text-primary font-semibold">
                {stats?.time_saved || '0h'}
              </div>
              <div className="font-technical-data text-technical-data text-text-secondary mt-1">
                Lifetime estimate
              </div>
            </div>
            <div className="bg-surface-clean rounded-xl p-space-md border border-border-soft shadow-sm hover:border-accent-teal/30 transition-colors">
              <div className="flex items-center gap-space-xs text-text-secondary mb-2">
                <span className="material-symbols-outlined text-[18px]">rule</span>
                <span className="font-technical-meta text-technical-meta uppercase tracking-wider">
                  Accuracy Rate
                </span>
              </div>
              <div className="font-headline-lg text-headline-lg text-text-primary font-semibold">
                {stats?.accuracy_rate || '100%'}
              </div>
              <div className="font-technical-data text-technical-data text-accent-teal mt-1">
                Zero blind submits
              </div>
            </div>
          </div>

          {/* Recent Autofill History */}
          <div className="bg-surface-clean rounded-xl border border-border-soft overflow-hidden shadow-sm">
            <div className="p-space-md border-b border-border-soft flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-text-primary font-medium tracking-tight">
                Recent Forms Filled
              </h2>
              <Link to="/app/history" className="text-accent-teal hover:text-primary font-label-md text-label-md font-medium transition-colors">
                View all
              </Link>
            </div>
            <div className="divide-y divide-border-soft bg-surface-clean">
              {recentHistory.map((item) => (
                <div key={item.id} className="p-space-md flex items-center justify-between hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-center gap-space-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-text-secondary group-hover:text-accent-teal transition-colors shrink-0">
                      <span className="material-symbols-outlined">description</span>
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-text-primary font-medium">
                        {item.portal_name}
                      </div>
                      <div className="font-body-sm text-body-sm text-text-secondary">
                        {item.portal_url}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-technical-data text-technical-data text-accent-teal bg-surface-container px-2 py-0.5 rounded">
                      {item.fields_filled_count || 18} fields filled
                    </span>
                    <span className="font-technical-meta text-technical-meta text-text-secondary mt-1">
                      {typeof item.created_at === 'string' && item.created_at.includes('T')
                        ? new Date(item.created_at).toLocaleDateString()
                        : item.created_at}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Side pane (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-lg">
          {/* Missing Info Warning */}
          <div className="bg-[#FEF5ED] border border-[#F3D8C3] rounded-xl p-space-md shadow-sm">
            <div className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-[#B25C1B] text-[20px] mt-0.5">warning</span>
              <div>
                <h3 className="font-label-md text-label-md font-medium text-[#7D3F12]">Missing Critical Information</h3>
                <p className="font-body-sm text-body-sm text-[#964E17] mt-1 leading-snug">
                  You frequently encounter forms asking for <strong>Passport Number</strong>, but it's not saved in your profile.
                </p>
                <button
                  type="button"
                  className="mt-3 px-3 py-1.5 bg-[#B25C1B] hover:bg-[#8F4A16] text-white font-label-sm text-label-sm rounded transition-colors shadow-sm"
                >
                  Add Passport Details
                </button>
              </div>
            </div>
          </div>

          {/* Extension Status */}
          <div className="bg-surface-clean rounded-xl p-space-md border border-border-soft shadow-sm">
            <h3 className="font-headline-sm text-[16px] font-medium text-text-primary mb-3">Extension Status</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" alt="Chrome" className="w-5 h-5" />
                  <span className="font-label-md text-label-md text-text-primary">Google Chrome</span>
                </div>
                <div className="flex items-center gap-1.5 text-accent-teal bg-accent-teal/10 px-2 py-0.5 rounded">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse"></div>
                  <span className="font-technical-data text-technical-data font-medium">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface">
                <div className="flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" alt="Edge" className="w-5 h-5 opacity-60" />
                  <span className="font-label-md text-label-md text-text-secondary">Microsoft Edge</span>
                </div>
                <button type="button" className="font-label-sm text-label-sm text-accent-teal hover:underline">
                  Install
                </button>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-surface-container-low rounded-xl p-space-md border border-border-soft">
            <h3 className="font-headline-sm text-[16px] font-medium text-text-primary mb-2">Need help?</h3>
            <p className="font-body-sm text-body-sm text-text-secondary mb-4">
              Found a form that wasn't filled out correctly? Let us know so we can improve our system.
            </p>
            <Link
              to="/app/report-issue"
              className="flex items-center justify-center gap-2 w-full py-2 bg-surface-clean border border-border-soft hover:bg-surface-container rounded-lg text-text-primary font-label-md text-label-md transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">flag</span>
              <span>Report an issue with a form</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
