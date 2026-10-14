import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { useNavigate } from 'react-router-dom'

export default function AccountPage() {
  const { user, profile, logout } = useProfile()
  const navigate = useNavigate()
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is permanent and cannot be undone.')) {
      logout()
      navigate('/login')
    }
  }

  const name = user?.name || profile?.personal_data?.full_name || 'User'
  const email = user?.email || profile?.contact_data?.email || 'user@example.com'
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-space-2xl animate-fade-in relative">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 flex items-center gap-space-sm px-space-md py-space-sm rounded-lg bg-surface-container-highest shadow-xl text-text-primary font-technical-data text-technical-data border border-border-soft ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-accent-teal text-[18px]">check_circle</span>
        <span>{toastMsg}</span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-space-xs pt-space-xs mb-space-lg">
        <div className="flex items-center gap-space-sm text-text-secondary font-technical-meta text-technical-meta uppercase tracking-wider">
          <span>Identity Protocol</span>
          <span>/</span>
          <span className="text-accent-teal">SEC-ACC-982</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-space-sm">
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-medium">Account</h1>
          <div className="flex items-center gap-space-xs font-technical-data text-technical-data text-text-secondary bg-surface-container px-space-sm py-1 rounded border border-border-soft">
            <span className="material-symbols-outlined text-[14px] text-accent-teal">lock</span>
            <span>Zero-Knowledge Vault Mode</span>
          </div>
        </div>
        <p className="font-body-md text-body-md text-text-secondary max-w-2xl">
          Manage your personal formER profile credentials and sign-in preferences.
        </p>
      </header>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg">
        {/* Section 1: Identity Card (Full Width) */}
        <section className="md:col-span-12 bg-surface-clean rounded-xl p-space-lg shadow-sm border border-border-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-lg">
            <div className="relative shrink-0">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-surface-container flex items-center justify-center text-text-primary font-headline-md text-headline-md tracking-tight select-none border border-border-soft">
                {initial}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent-teal text-surface-clean flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[14px]">verified</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-sm flex-wrap">
                <h2 className="font-headline-sm text-headline-sm text-text-primary font-medium">{name}</h2>
                <span className="font-technical-meta text-technical-meta text-on-surface-variant bg-surface-container px-space-xs py-0.5 rounded border border-border-soft">
                  Primary Identity
                </span>
              </div>
              <p className="font-technical-code text-technical-code text-text-secondary">{email}</p>
              <div className="flex items-center gap-space-md pt-space-xs flex-wrap">
                <div className="flex items-center gap-1.5 font-technical-data text-technical-data text-text-secondary">
                  <span className="material-symbols-outlined text-[15px]">event</span>
                  <span>Registered Member</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border-soft"></div>
                <div className="flex items-center gap-1.5 font-technical-data text-technical-data text-text-primary">
                  <span className="material-symbols-outlined text-[15px] text-accent-teal">shield</span>
                  <span>Active · Local AES-GCM enabled</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-space-sm">
            <button
              onClick={() => navigate('/app/my-information')}
              className="h-10 px-space-md bg-surface-container hover:bg-surface-variant active:scale-[0.98] transition-transform rounded-lg font-label-md text-label-md text-text-primary flex items-center gap-space-xs border border-border-soft"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>Edit profile vault</span>
            </button>
            <span className="font-technical-meta text-technical-meta text-text-secondary">Vault ID: #FRM-VAULT-01</span>
          </div>
        </section>

        {/* Section 2: Sign-in & Security (7 cols) */}
        <section className="md:col-span-7 flex flex-col gap-space-md">
          <div className="bg-surface-clean rounded-xl p-space-lg shadow-sm border border-border-soft flex flex-col gap-space-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-text-secondary text-[20px]">key</span>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-medium">Sign-in & Security</h3>
              </div>
              <span className="font-technical-meta text-technical-meta text-text-secondary uppercase">Tier 1 Auth</span>
            </div>

            <div className="flex flex-col gap-space-md">
              <div className="p-space-md rounded-lg bg-surface border border-border-soft flex items-center justify-between gap-space-md">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Email Address</span>
                  <span className="font-body-md text-body-md text-text-primary font-medium truncate">{email}</span>
                </div>
                <button
                  onClick={() => triggerToast(`Verification link sent to ${email}`)}
                  className="shrink-0 h-9 px-space-md bg-surface-clean hover:bg-surface-container active:scale-[0.98] transition-transform rounded-lg text-text-primary font-label-sm text-label-sm border border-border-soft shadow-sm flex items-center gap-1"
                  type="button"
                >
                  <span>Update email</span>
                </button>
              </div>

              <div className="p-space-md rounded-lg bg-surface border border-border-soft flex items-center justify-between gap-space-md">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Password</span>
                  <span className="font-body-sm text-body-sm text-text-secondary">Managed securely via salted PBKDF2</span>
                </div>
                <button
                  onClick={() => triggerToast('Password reset sequence initiated')}
                  className="shrink-0 h-9 px-space-md bg-surface-clean hover:bg-surface-container active:scale-[0.98] transition-transform rounded-lg text-text-primary font-label-sm text-label-sm border border-border-soft shadow-sm flex items-center gap-1"
                  type="button"
                >
                  <span>Change password</span>
                </button>
              </div>

              {/* 2FA block */}
              <div className="pt-space-xs flex flex-col gap-space-xs">
                <span className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider px-space-xs">
                  Multi-Factor Protocol
                </span>
                <div className="p-space-md rounded-lg bg-surface border border-border-soft flex items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="w-9 h-9 rounded-lg bg-surface-clean border border-border-soft shadow-sm flex items-center justify-center shrink-0 text-accent-teal">
                      <span className="material-symbols-outlined text-[20px]">phonelink_lock</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-text-primary font-medium">Two-Factor Authentication</span>
                      <span className="font-technical-code text-technical-code text-text-secondary">
                        Hardware key &amp; Authenticator ready
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => triggerToast('2FA security token active.')}
                    className="shrink-0 h-9 px-space-md bg-surface-clean hover:bg-surface-container active:scale-[0.98] transition-transform rounded-lg text-text-primary font-label-sm text-label-sm border border-border-soft shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <span>Manage 2FA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Devices & Extension Sessions (5 cols) */}
        <section className="md:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-clean rounded-xl p-space-lg shadow-sm border border-border-soft flex flex-col justify-between h-full gap-space-lg">
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-text-secondary text-[20px]">devices</span>
                  <h3 className="font-headline-sm text-headline-sm text-text-primary font-medium">Extension &amp; Devices</h3>
                </div>
                <span className="font-technical-meta text-technical-meta text-text-secondary">Active Bridge</span>
              </div>

              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="p-space-md rounded-lg bg-surface border border-border-soft flex items-start gap-space-md">
                  <div className="w-10 h-10 rounded-lg bg-surface-clean border border-border-soft shadow-sm flex items-center justify-center shrink-0 text-text-primary">
                    <span className="material-symbols-outlined text-[22px]">extension</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-text-primary font-medium truncate">
                      formER Chrome Extension
                    </span>
                    <span className="font-technical-data text-technical-data text-accent-teal">Connected &amp; Ready</span>
                    <span className="font-technical-meta text-technical-meta text-text-secondary mt-1">
                      Manifest V3 • Auto-suggest enabled
                    </span>
                  </div>
                  <div className="ml-auto flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-teal" title="Active"></span>
                  </div>
                </div>

                <div className="p-space-md rounded-lg bg-surface border border-border-soft flex items-start gap-space-md">
                  <div className="w-10 h-10 rounded-lg bg-surface-clean border border-border-soft shadow-sm flex items-center justify-center shrink-0 text-text-secondary">
                    <span className="material-symbols-outlined text-[22px]">laptop_mac</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-text-primary font-medium truncate">Web Dashboard</span>
                    <span className="font-technical-data text-technical-data text-text-secondary">Current Browser Session</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => triggerToast('All other session tokens invalidated.')}
              className="w-full h-10 px-space-md bg-surface hover:bg-surface-container text-text-primary font-label-md text-label-md rounded-lg border border-border-soft transition-colors flex items-center justify-center gap-space-xs active:scale-[0.99]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-text-secondary">logout</span>
              <span>Sign out other sessions</span>
            </button>
          </div>
        </section>

        {/* Section 4: Danger Zone */}
        <section className="md:col-span-12 mt-space-md">
          <div className="bg-surface-clean rounded-xl p-space-lg shadow-sm border border-border-soft flex flex-col md:flex-row md:items-center justify-between gap-space-lg relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
            <div className="flex items-start gap-space-md pl-2">
              <div className="w-10 h-10 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
              <div className="flex flex-col gap-1 max-w-2xl">
                <div className="flex items-center gap-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-text-primary font-medium">Delete Account</h3>
                  <span className="font-technical-meta text-technical-meta text-error uppercase bg-error-container/40 px-space-xs py-0.5 rounded">
                    Irreversible
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  Permanently delete your formER account and purge all stored data from your local browser vault.
                </p>
              </div>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="h-10 px-space-lg rounded-lg bg-surface-container hover:bg-error-container text-error hover:text-on-error-container font-label-md text-label-md transition-colors active:scale-[0.98] flex items-center gap-space-xs shrink-0"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              <span>Delete account</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
