export default function SettingsPage() {
  const toggleSwitch = (e) => {
    const btn = e.currentTarget
    const isChecked = btn.getAttribute('aria-checked') === 'true'
    const nextState = !isChecked
    btn.setAttribute('aria-checked', String(nextState))

    const thumb = btn.querySelector('span:not(.sr-only)')
    if (nextState) {
      btn.classList.remove('bg-surface-container-high')
      btn.classList.add('bg-accent-teal')
      thumb.classList.remove('translate-x-0')
      thumb.classList.add('translate-x-5')
    } else {
      btn.classList.remove('bg-accent-teal')
      btn.classList.add('bg-surface-container-high')
      thumb.classList.remove('translate-x-5')
      thumb.classList.add('translate-x-0')
    }
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-space-2xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
        <div>
          <div className="flex items-center gap-space-xs text-text-secondary font-technical-meta text-technical-meta uppercase tracking-wider mb-1">
            <span>Account</span>
            <span>/</span>
            <span className="text-accent-teal">Preferences</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-medium">Settings</h1>
          <p className="font-body-md text-body-md text-text-secondary mt-1 max-w-2xl">
            Configure how formER behaves when detecting forms and filling in your information.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Navigation */}
        <div className="lg:col-span-3 sticky top-24 hidden lg:flex flex-col gap-1">
          <span className="font-technical-meta text-technical-meta uppercase tracking-wider text-text-secondary px-space-sm mb-space-xs">
            Categories
          </span>
          <a
            className="flex items-center gap-space-sm px-space-sm py-2 rounded font-label-md text-label-md text-text-primary bg-surface-container font-medium border-l-2 border-accent-teal"
            href="#autofill"
          >
            <span className="material-symbols-outlined text-[18px]">rule</span>
            <span>Autofill Behavior</span>
          </a>
          <a
            className="flex items-center gap-space-sm px-space-sm py-2 rounded font-label-md text-label-md text-text-secondary hover:text-text-primary hover:bg-surface-container transition-colors"
            href="#privacy"
          >
            <span className="material-symbols-outlined text-[18px]">security</span>
            <span>Privacy &amp; Safety</span>
          </a>
        </div>

        {/* Main Settings Flow */}
        <div className="lg:col-span-9 flex flex-col gap-space-xl">
          <section className="bg-surface-clean rounded-xl border border-border-soft p-space-lg shadow-sm" id="autofill">
            <div className="flex items-center justify-between pb-space-md border-b border-border-soft mb-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-text-primary text-[20px]">tune</span>
                <h2 className="font-headline-sm text-headline-sm text-text-primary font-medium tracking-tight">
                  Autofill Preferences
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-space-lg">
              <div className="flex items-start justify-between gap-space-lg">
                <div className="flex flex-col pr-space-md">
                  <label
                    className="font-label-md text-label-md text-text-primary font-medium cursor-pointer"
                    htmlFor="toggle-autodetect"
                  >
                    Automatically detect online forms
                  </label>
                  <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                    Recognizes admission, job portals, and institutional forms automatically when you navigate to them.
                  </p>
                </div>
                <button
                  aria-checked="true"
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-teal/20 bg-accent-teal"
                  id="toggle-autodetect"
                  onClick={toggleSwitch}
                  role="switch"
                  type="button"
                >
                  <span className="sr-only">Toggle automatically detect</span>
                  <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface-clean shadow ring-0 transition duration-200 ease-in-out translate-x-5"></span>
                </button>
              </div>

              <div className="h-px bg-border-soft w-full"></div>

              <div className="flex items-start justify-between gap-space-lg">
                <div className="flex flex-col pr-space-md">
                  <label
                    className="font-label-md text-label-md text-text-primary font-medium cursor-pointer"
                    htmlFor="toggle-sensitive"
                  >
                    Always ask before filling sensitive fields
                  </label>
                  <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                    Prompts for explicit manual confirmation before inserting national identity numbers, passport records, or
                    financial information.
                  </p>
                </div>
                <button
                  aria-checked="true"
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-teal/20 bg-accent-teal"
                  id="toggle-sensitive"
                  onClick={toggleSwitch}
                  role="switch"
                  type="button"
                >
                  <span className="sr-only">Toggle sensitive confirmation</span>
                  <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface-clean shadow ring-0 transition duration-200 ease-in-out translate-x-5"></span>
                </button>
              </div>
            </div>
          </section>

          <section className="bg-surface-clean rounded-xl border border-border-soft p-space-lg shadow-sm" id="privacy">
            <div className="flex items-center justify-between pb-space-md border-b border-border-soft mb-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-text-primary text-[20px]">shield</span>
                <h2 className="font-headline-sm text-headline-sm text-text-primary font-medium tracking-tight">
                  Privacy &amp; Security
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-space-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md rounded-lg bg-surface-container-low border border-border-soft">
                <div className="flex items-start gap-space-md">
                  <span className="material-symbols-outlined text-accent-teal text-[24px] mt-0.5">lock</span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-label-md text-label-md text-text-primary font-medium">
                        Local encryption on device
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface border border-border-soft text-accent-teal font-technical-data text-technical-data font-medium">
                        Protected
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                      Your saved records are securely encrypted directly on your personal device, ensuring nobody else can read them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
