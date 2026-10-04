import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'

export default function MyInformationPage() {
  const { profile, updateProfile } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    dob: profile?.dob || '',
    gender: profile?.gender || '',
    nationality: profile?.nationality || ''
  })

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col w-full animate-fade-in">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Page Header & Overview Card */}
        <div className="bg-surface-clean rounded-xl p-space-lg shadow-sm border border-border-soft">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight">My Information</h1>
                <span className="px-2 py-0.5 rounded text-technical-meta font-technical-meta bg-surface-container text-secondary">
                  Verified Profile
                </span>
              </div>
              <p className="font-body-md text-body-md text-text-secondary">
                Keep your details up to date. formER uses this information when helping you fill online forms.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-label-md text-label-md transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">history</span>
                <span>Recent Updates</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-teal hover:bg-primary text-surface-clean font-label-md text-label-md transition-colors shadow-sm active:translate-y-[1px]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Check All Fields</span>
              </button>
            </div>
          </div>
          {/* Profile Completion Gauge */}
          <div className="bg-surface rounded-lg p-space-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-accent-teal">
                  <span className="material-symbols-outlined text-[22px]">checklist</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">82% Complete</span>
                    <span className="font-technical-data text-technical-data text-secondary">· 4 items recommended</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-secondary">
                    Adding your passport and alternate contact will unlock high-speed visa &amp; job autofills.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg bg-surface-clean hover:bg-surface-container text-accent-teal font-label-sm text-label-sm transition-colors shadow-sm"
                  type="button"
                >
                  + Link Passport
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg bg-surface-clean hover:bg-surface-container text-text-secondary font-label-sm text-label-sm transition-colors shadow-sm"
                  type="button"
                >
                  Add Work Contact
                </button>
              </div>
            </div>
            {/* Metric progress track */}
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-accent-teal rounded-full transition-all duration-500 ease-out" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>

        {/* 2 Column Editorial Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Primary Core (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Personal Information Card */}
            <div className="bg-surface-clean rounded-xl p-space-lg shadow-sm border border-border-soft">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-accent-teal">badge</span>
                  <h2 className="font-headline-sm text-headline-sm text-text-primary font-medium">Personal Information</h2>
                </div>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent-teal text-white hover:bg-primary font-label-sm text-label-sm transition-colors shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">save</span>
                    <span>Save</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-accent-teal hover:bg-surface-container font-label-sm text-label-sm transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Edit</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-surface rounded-lg">
                  <div className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider mb-1">
                    Full Legal Name
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full bg-surface-clean border border-border-soft rounded p-1 text-body-md"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  ) : (
                    <div className="font-body-md text-body-md text-text-primary font-medium">{profile?.name || 'Not provided'}</div>
                  )}
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <div className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider mb-1">
                    Date of Birth
                  </div>
                  {isEditing ? (
                    <input
                      type="date"
                      className="w-full bg-surface-clean border border-border-soft rounded p-1 text-body-md"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    />
                  ) : (
                    <div className="font-body-md text-body-md text-text-primary font-medium">{profile?.dob || 'Not provided'}</div>
                  )}
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <div className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider mb-1">
                    Gender
                  </div>
                  {isEditing ? (
                    <select
                      className="w-full bg-surface-clean border border-border-soft rounded p-1 text-body-md"
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="font-body-md text-body-md text-text-primary font-medium">{profile?.gender || 'Not provided'}</div>
                  )}
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <div className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider mb-1">
                    Nationality
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full bg-surface-clean border border-border-soft rounded p-1 text-body-md"
                      value={formData.nationality}
                      onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    />
                  ) : (
                    <div className="font-body-md text-body-md text-text-primary font-medium">{profile?.nationality || 'Not provided'}</div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Contact Information Card */}
            <div className="bg-surface-clean rounded-xl p-space-lg shadow-sm border border-border-soft">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-accent-teal">contact_phone</span>
                  <h2 className="font-headline-sm text-headline-sm text-text-primary font-medium">Contact Information</h2>
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-accent-teal hover:bg-surface-container font-label-sm text-label-sm transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>Edit</span>
                </button>
              </div>
              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-surface rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider block mb-0.5">
                      Primary Email
                    </span>
                    <span className="font-body-md text-body-md text-text-primary font-medium">aarav.sharma@domain.co</span>
                  </div>
                  <span className="self-start sm:self-auto px-2 py-0.5 bg-surface-container text-accent-teal font-technical-data text-technical-data rounded">
                    Verified
                  </span>
                </div>
                <div className="p-3.5 bg-surface rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider block mb-0.5">
                      Mobile Number
                    </span>
                    <span className="font-body-md text-body-md text-text-primary font-medium font-technical-code">
                      +91 98765 43210
                    </span>
                  </div>
                  <span className="self-start sm:self-auto px-2 py-0.5 bg-surface-container text-accent-teal font-technical-data text-technical-data rounded">
                    OTP Validated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Identity, Family & Common Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 5. Identity Information Card */}
            <div className="bg-surface-clean rounded-xl p-space-lg shadow-sm border border-border-soft">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-accent-teal">fingerprint</span>
                  <h2 className="font-headline-sm text-headline-sm text-text-primary font-medium">Identity Documents</h2>
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-accent-teal hover:bg-surface-container font-label-sm text-label-sm transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>Edit</span>
                </button>
              </div>
              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-surface rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider">
                      Aadhaar (UIDAI)
                    </span>
                    <span className="font-technical-data text-technical-data text-accent-teal bg-surface-container px-2 py-0.5 rounded">
                      Secured
                    </span>
                  </div>
                  <div className="font-technical-code text-technical-code text-text-primary font-medium">
                    •••• •••• 9012
                  </div>
                </div>
                <div className="p-3.5 bg-surface rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-technical-meta text-technical-meta text-text-secondary uppercase tracking-wider">
                      PAN Number
                    </span>
                    <span className="font-technical-data text-technical-data text-accent-teal bg-surface-container px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                  <div className="font-technical-code text-technical-code text-text-primary font-medium tracking-wide">
                    ABCPS1234F
                  </div>
                </div>
              </div>
            </div>
            
            {/* Privacy & Protection Box */}
            <div className="bg-surface-container p-space-md rounded-xl space-y-2 border border-border-soft">
              <div className="flex items-center gap-2 text-accent-teal font-medium">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="font-label-md text-label-md">Encrypted on your device</span>
              </div>
              <p className="font-body-sm text-body-sm text-text-secondary">
                Your information stays stored locally and is securely populated only when you explicitly confirm autofill in
                browser tabs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
