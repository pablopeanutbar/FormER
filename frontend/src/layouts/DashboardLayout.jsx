import { Link, NavLink, Outlet } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'

export default function DashboardLayout() {
  const { profile, logout } = useProfile()

  const getNavClass = ({ isActive }) =>
    `flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors font-label-md text-label-md ${
      isActive
        ? 'bg-surface-container text-text-primary font-medium border-l-2 border-accent-teal pl-[calc(1rem-2px)]'
        : 'text-text-secondary hover:bg-surface-container hover:text-text-primary pl-space-md border-l-2 border-transparent'
    }`

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-clean border-r border-border-soft z-50 flex flex-col justify-between select-none">
        <div className="flex flex-col">
          <div className="h-16 px-space-lg flex items-center gap-space-sm border-b border-border-soft">
            <Link to="/app/dashboard" className="font-headline-sm text-headline-sm text-text-primary tracking-tight font-medium">
              form<span className="text-accent-teal">ER</span>
            </Link>
            <span className="font-technical-meta text-technical-meta text-text-secondary px-space-xs py-0.5 rounded bg-surface-container border border-border-soft ml-auto">
              v1.4
            </span>
          </div>

          <nav className="flex flex-col gap-0.5 p-space-sm mt-2">
            <NavLink to="/app/dashboard" className={getNavClass} end>
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/app/my-information" className={getNavClass}>
              <span className="material-symbols-outlined text-[18px]">badge</span>
              <span>My Information</span>
            </NavLink>
            <NavLink to="/app/history" className={getNavClass}>
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>History</span>
            </NavLink>
            <NavLink to="/app/account" className={getNavClass}>
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>Account</span>
            </NavLink>
            <NavLink to="/app/settings" className={getNavClass}>
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-col border-t border-border-soft p-space-sm gap-space-xs">
          <NavLink to="/app/report-issue" className={getNavClass}>
            <span className="material-symbols-outlined text-[18px]">flag</span>
            <span>Report an issue</span>
          </NavLink>
          <div className="mt-space-xs pt-space-xs px-space-sm py-space-xs flex items-center justify-between">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-text-primary truncate">{profile?.name || 'User'}</span>
                <span className="font-technical-meta text-technical-meta text-text-secondary truncate">
                  {profile?.email || 'guest@domain.co'}
                </span>
              </div>
            </div>
            <Link
              to="/login"
              onClick={logout}
              className="p-space-xs text-text-secondary hover:text-text-primary rounded-lg transition-colors"
              title="Sign out"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 w-full">
        {/* Top Header */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface-clean/90 backdrop-blur-md border-b border-border-soft z-40 flex items-center justify-between px-space-lg">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container border border-border-soft text-text-secondary font-technical-data text-technical-data">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              <span>Autofill Ready</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <button
              type="button"
              className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg border border-border-soft bg-surface hover:bg-surface-container text-text-primary font-label-sm text-label-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span className="hidden sm:inline">Search profile</span>
              <kbd className="font-technical-meta text-technical-meta text-text-secondary ml-space-xs">⌘K</kbd>
            </button>
            <div className="w-px h-5 bg-border-soft"></div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative pt-16 bg-surface min-h-screen">
          <div className="w-full px-space-lg py-space-lg">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
