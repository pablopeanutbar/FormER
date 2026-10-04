import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas-paper">
      <header className="h-[68px] bg-canvas-paper border-b border-border-soft sticky top-0 z-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a className="text-xl font-bold tracking-tight text-text-primary flex items-center" href="/">
              <span className="">
                form<span className="font-bold text-accent-teal">ER.</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-6 text-[13px] font-normal text-text-secondary">
              <a className="hover:text-text-primary transition-colors" href="#product">
                Product
              </a>
              <a className="hover:text-text-primary transition-colors" href="#how-it-works">
                How it works
              </a>
              <a className="hover:text-text-primary transition-colors" href="#privacy">
                Privacy &amp; Safety
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              className="hidden md:inline-flex items-center justify-center font-label-md text-label-md font-medium text-text-primary hover:text-accent-teal transition-colors"
              href="/login"
            >
              Log in
            </a>
            <a
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-accent-teal hover:bg-primary rounded transition-colors shadow-sm"
              href="/signup"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-canvas-paper border-t border-border-soft py-10 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-base font-bold tracking-tight text-text-primary mb-1">
              form<span className="font-bold text-accent-teal">ER</span>
            </div>
            <p className="text-xs text-text-secondary">
              Never re-type your personal and academic details into long online portals.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-secondary">
            <a className="hover:text-text-primary transition-colors" href="#product">
              Product
            </a>
            <a className="hover:text-text-primary transition-colors" href="#how-it-works">
              How it works
            </a>
            <a className="hover:text-text-primary transition-colors" href="#privacy">
              Privacy &amp; Safety
            </a>
            <a className="hover:text-text-primary transition-colors" href="#universities">
              For Universities &amp; Students
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
