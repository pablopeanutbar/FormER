import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'

export default function CreateAccountPage() {
  const navigate = useNavigate()
  const { login } = useProfile()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    
    // Save to context
    login({ name, email })
    navigate('/app/dashboard')
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-space-md sm:p-space-xl bg-canvas-paper animate-fade-in">
      <div className="flex flex-col w-full items-center justify-center py-space-xl px-space-md">
        
        <div className="flex items-center gap-space-xs mb-space-lg select-none">
          <Link to="/" className="font-display-hero text-headline-sm tracking-tight text-text-primary font-semibold">
            form<span className="text-accent-teal">ER</span>
          </Link>
         
        </div>

        <div className="w-full max-w-md bg-surface-clean rounded-xl shadow-sm p-space-lg sm:p-space-xl flex flex-col">
          <div className="flex flex-col mb-space-lg">
            <h1 className="font-headline-md text-headline-sm text-text-primary font-medium tracking-tight mb-space-xs">
              Create your formER account
            </h1>
            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
              Save your information once and use it whenever you fill a form.
            </p>
          </div>

          <button
            className="w-full flex items-center justify-center gap-space-sm h-11 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container active:scale-[0.99] transition-all text-text-primary text-label-md font-label-md"
            type="button"
          >
            <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.01h3.87c2.26-2.09 3.675-5.17 3.675-9.11z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.01c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.12C3.25 21.3 7.34 24 12 24z"
                fill="#34A853"
              ></path>
              <path
                d="M5.27 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.6H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.4l4-3.12z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.7 1.27 6.6l4 3.12c.95-2.85 3.6-4.97 6.73-4.97z"
                fill="#EA4335"
              ></path>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-space-lg flex items-center justify-center">
            <div className="w-full h-px bg-surface-container-high"></div>
            <span className="absolute bg-surface-clean px-space-sm font-technical-meta text-technical-meta uppercase tracking-wider text-secondary">
              Or continue with email
            </span>
          </div>

          <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-text-primary font-medium" htmlFor="name">
                Full Name
              </label>
              <div className="relative w-full">
                <input
                  className="w-full h-11 px-space-md bg-surface-container-low text-text-primary font-body-sm text-body-sm rounded-lg placeholder:text-secondary focus:bg-surface-clean focus:outline-none focus:ring-1 focus:ring-accent-teal transition-all"
                  id="name"
                  name="name"
                  placeholder="Shariq Sharma"
                  required
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-text-primary font-medium" htmlFor="email">
                Email Address
              </label>
              <div className="relative w-full">
                <input
                  className="w-full h-11 px-space-md bg-surface-container-low text-text-primary font-body-sm text-body-sm rounded-lg placeholder:text-secondary focus:bg-surface-clean focus:outline-none focus:ring-1 focus:ring-accent-teal transition-all"
                  id="email"
                  name="email"
                  placeholder="shariq@domain.co"
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-text-primary font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative w-full flex items-center">
                <input
                  className="w-full h-11 pl-space-md pr-10 bg-surface-container-low text-text-primary font-body-sm text-body-sm rounded-lg placeholder:text-secondary focus:bg-surface-clean focus:outline-none focus:ring-1 focus:ring-accent-teal transition-all"
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                />
                <button
                  aria-label="Toggle password visibility"
                  className="absolute right-3 flex items-center justify-center text-secondary hover:text-text-primary transition-colors focus:outline-none"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-text-primary font-medium" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative w-full flex items-center">
                <input
                  className="w-full h-11 pl-space-md pr-10 bg-surface-container-low text-text-primary font-body-sm text-body-sm rounded-lg placeholder:text-secondary focus:bg-surface-clean focus:outline-none focus:ring-1 focus:ring-accent-teal transition-all"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="••••••••••••"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                />
                <button
                  aria-label="Toggle confirm password visibility"
                  className="absolute right-3 flex items-center justify-center text-secondary hover:text-text-primary transition-colors focus:outline-none"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-space-xs text-text-secondary font-body-sm text-[12px] leading-relaxed">
              By creating an account, you agree to our{' '}
              <a className="text-text-primary hover:text-accent-teal underline underline-offset-2" href="#">
                Terms of Service
              </a>{' '}
              &amp;{' '}
              <a className="text-text-primary hover:text-accent-teal underline underline-offset-2" href="#">
                Privacy Policy
              </a>
              . Your data stays encrypted on your device.
            </div>

            <button
              className="w-full h-11 mt-space-sm bg-accent-teal hover:bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-space-xs transition-all active:translate-y-[1px] shadow-sm select-none"
              type="submit"
            >
              <span>Create account</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <div className="mt-space-lg pt-space-md flex items-center justify-center">
            <span className="font-body-sm text-body-sm text-text-secondary">Existing user?</span>
            <Link
              className="ml-1.5 font-label-md text-body-sm font-medium text-accent-teal hover:text-primary transition-colors"
              to="/login"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-space-lg flex items-center justify-center gap-space-xs text-text-secondary font-technical-meta text-technical-meta tracking-normal select-none">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span>Encrypted on your device</span>
          <span>·</span>
          <span>Zero automated submissions</span>
        </div>
      </div>
    </div>
  )
}
