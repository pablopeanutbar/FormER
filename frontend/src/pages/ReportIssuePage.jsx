export default function ReportIssuePage() {
  return (
    <div className="flex flex-col w-full">
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="font-headline-lg text-headline-lg text-text-primary mb-4">Report an Issue</h1>
        <div className="bg-surface-clean rounded-xl border border-border-soft overflow-hidden shadow-sm p-6">
          <form className="flex flex-col gap-4">
            <div>
              <label className="font-label-md text-text-primary block mb-2">Issue Description</label>
              <textarea 
                className="w-full min-h-[150px] p-3 rounded-lg border border-border-soft bg-surface-container-low text-body-md focus:outline-none focus:ring-1 focus:ring-accent-teal resize-y"
                placeholder="Describe the issue you encountered..."
              ></textarea>
            </div>
            <button
              className="self-start px-6 py-2 bg-accent-teal hover:bg-primary text-white font-label-md rounded-lg transition-colors shadow-sm"
              type="button"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
