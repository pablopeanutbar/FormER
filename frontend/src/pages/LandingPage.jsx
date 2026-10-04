import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      <section className="py-12 lg:py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-border-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 pt-2">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-text-secondary uppercase block mb-3">
              BROWSER EXTENSION FOR FORMS
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.12] mb-5">
              Stop filling forms manually
            </h1>
            <p className="text-[15px] leading-relaxed text-text-secondary mb-8 max-w-md">
              formER remembers your details, documents, and past applications—then automatically fills out long online
              forms in seconds.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-accent-teal hover:bg-primary rounded transition-all hover:scale-[1.02] active:scale-[0.98] duration-200 shadow-sm"
              >
                Get started
              </Link>
              <span className="text-xs text-text-secondary font-normal">Chrome, Edge &amp; Brave &nbsp;·&nbsp; Free to use</span>
            </div>
            <div className="flex items-start space-x-2 text-text-secondary">
              <svg
                className="w-4 h-4 text-accent-teal flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              <p className="text-xs text-text-secondary leading-tight">
                You review everything before it fills. No surprises, no blind submissions.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg border border-border-soft shadow-sm overflow-hidden text-[11px]">
              <div className="bg-[#F0F2F0] px-3 py-2 border-b border-border-soft flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <div className="bg-white px-3 py-1 rounded border border-border-soft w-full max-w-sm flex items-center space-x-1.5 text-zinc-500 font-mono text-[10px]">
                    <svg className="w-3 h-3 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span className="truncate">exams.upsc.gov.in/applicant/reg-step2.html</span>
                  </div>
                </div>
                <div className="w-5 h-5 flex items-center justify-center rounded bg-accent-teal text-white font-bold text-[9px]">
                  F
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x border-border-soft bg-white">
                <div className="p-5 md:col-span-7 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                    <span className="font-mono text-[10px] uppercase font-semibold text-text-secondary tracking-wider">
                      APPLICATION FORM · STEP 2 OF 4
                    </span>
                    <span className="bg-surface-tint/10 text-accent-teal border border-accent-teal/20 text-[9px] px-1.5 py-0.5 rounded font-mono font-medium">
                      Autofill ready
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <label className="text-text-secondary font-medium">Full Name (as per matriculation)</label>
                      <span className="text-accent-teal font-mono text-[9px]">Matched</span>
                    </div>
                    <div className="flex justify-between items-center px-2.5 py-1.5 rounded border border-zinc-200 bg-white">
                      <span className="font-medium text-text-primary">Aarav V. Sharma</span>
                      <span className="text-[9px] text-zinc-400">from Saved Profile</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <label className="text-text-secondary font-medium">Father's Full Name</label>
                      <span className="text-accent-teal font-mono text-[9px]">Matched</span>
                    </div>
                    <div className="flex justify-between items-center px-2.5 py-1.5 rounded border border-zinc-200 bg-white">
                      <span className="font-medium text-text-primary">Vikram S. Sharma</span>
                      <span className="text-[9px] text-zinc-400">from Saved Profile</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <label className="text-text-secondary font-medium">Date of Birth (DD/MM/YYYY)</label>
                      <span className="text-accent-teal font-mono text-[9px]">Auto-formatted</span>
                    </div>
                    <div className="flex justify-between items-center px-2.5 py-1.5 rounded border border-zinc-200 bg-white">
                      <span className="font-medium text-text-primary">14/08/1998</span>
                      <span className="text-[9px] text-zinc-400">DD/MM/YYYY converted</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:col-span-5 bg-surface flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-border-soft">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-xs tracking-tight text-text-primary">formER</span>
                        <span className="bg-surface-tint/10 text-accent-teal text-[8px] font-mono px-1 rounded border border-accent-teal/20 font-medium">
                          Ready
                        </span>
                      </div>
                      <span className="text-[10px] text-text-secondary font-mono">Ready to fill (5)</span>
                    </div>
                    <div className="mt-3 p-2.5 bg-white rounded border border-border-soft">
                      <div className="flex items-center space-x-1.5 text-text-primary text-[11px] font-medium mb-1">
                        <svg className="w-3.5 h-3.5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span className="">5 fields recognized</span>
                      </div>
                      <p className="text-[10px] text-text-secondary leading-tight mb-2">
                        All required application details found in your saved records.
                      </p>
                      <div className="text-[9px] font-mono text-accent-teal">0 missing info · Ready to review</div>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] py-1 border-b border-zinc-100">
                        <span className="text-text-secondary">Full Name</span>
                        <span className="text-accent-teal font-mono text-[9px] flex items-center">
                          <span className="mr-0.5">✓</span> Profile
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] py-1 border-b border-zinc-100">
                        <span className="text-text-secondary">Father's Name</span>
                        <span className="text-accent-teal font-mono text-[9px] flex items-center">
                          <span className="mr-0.5">✓</span> Profile
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] py-1 border-b border-zinc-100">
                        <span className="text-text-secondary">Date of Birth</span>
                        <span className="text-accent-teal font-mono text-[9px] flex items-center">
                          <span className="mr-0.5">✓</span> Date OK
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      className="w-full py-2 bg-accent-teal hover:bg-primary text-white text-[11px] font-medium rounded flex items-center justify-center space-x-1.5 transition-colors"
                      type="button"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span className="">Fill this form</span>
                    </button>
                    <p className="text-[9px] text-zinc-400 text-center mt-2 leading-tight">
                      Review your details anytime before submitting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-border-soft">
        <div className="mb-10 max-w-3xl">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-accent-teal uppercase block mb-2">
            THE PROBLEM
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary leading-snug mb-3">
            The average university or job application asks for the exact same information across 6 pages.
          </h2>
          <p className="text-[14px] text-text-secondary leading-relaxed">
            Applicants spend hours re-typing high school marks, roll numbers, permanent addresses, and parent details into
            rigid portals that time out before you finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg border border-border-soft flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 md:p-8 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                <span className="text-text-secondary tracking-wider">APPLICATION 01</span>
                <span className="px-1.5 py-0.5 rounded bg-error-container text-error font-medium">38 repetitive fields</span>
              </div>
              <h3 className="font-semibold text-text-primary text-base mb-2">University Admissions Portal</h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
                Requires re-entering high school board roll numbers, semester marks, guardian annual income, and both
                permanent vs mailing addresses line by line.
              </p>
            </div>
            <div className="px-5 py-5 md:px-8 bg-surface border-t md:border-t-0 md:border-l border-border-soft text-[11px] text-text-secondary space-y-2 flex flex-col justify-center min-w-[280px]">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                <span className="font-medium text-text-primary">Board Roll Number &amp; Marks</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                <span className="font-medium text-text-primary">Guardian Income Certification</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                <span className="font-medium text-text-primary">Permanent &amp; Present Addresses</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border-soft flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                <span className="text-text-secondary tracking-wider">APPLICATION 02</span>
                <span className="px-1.5 py-0.5 rounded bg-error-container text-error font-medium">42 repetitive fields</span>
              </div>
              <h3 className="font-semibold text-text-primary text-sm mb-2">Government Job &amp; Civil Service Exam</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Forces re-entry of Class 10th and 12th certificate serials, state domicile certificate details, identity proofs,
                and multiple education categories.
              </p>
            </div>
            <div className="px-5 py-4 bg-surface border-t border-border-soft text-[11px] text-text-secondary space-y-1.5">
              <div className="flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-error"></span>
                <span className="">10th/12th Certificate Serials</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-error"></span>
                <span className="">State Domicile Verification</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-error"></span>
                <span className="">National ID &amp; Category Proof</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border-soft flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                <span className="text-text-secondary tracking-wider">APPLICATION 03</span>
                <span className="px-1.5 py-0.5 rounded bg-error-container text-error font-medium">29 repetitive fields</span>
              </div>
              <h3 className="font-semibold text-text-primary text-sm mb-2">Scholarship &amp; Grant Application</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Demands repeated entry of institution affiliation codes, previous academic year GPAs, branch IFSC bank details,
                and category certificates.
              </p>
            </div>
            <div className="px-5 py-4 bg-surface border-t border-border-soft text-[11px] text-text-secondary space-y-1.5">
              <div className="flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-error"></span>
                <span className="">Academic Year GPA Scores</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-error"></span>
                <span className="">Institution Affiliation Codes</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1 h-1 rounded-full bg-error"></span>
                <span className="">Bank &amp; IFSC Account Records</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto text-center" id="cta">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-accent-teal uppercase block mb-3">
          READY FOR YOUR NEXT APPLICATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-4">
          Stop filling forms manually, leave it to formER.
        </h2>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
          Free lightweight browser extension for Chrome, Edge, and Brave. Start your next application without the headache.
        </p>
        <div className="flex justify-center mb-6">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold text-white bg-accent-teal hover:bg-primary rounded transition-all hover:scale-[1.02] active:scale-[0.98] duration-200 shadow-sm"
          >
            Get started
          </Link>
        </div>
      </section>
    </div>
  )
}
