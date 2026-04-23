import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Code2 } from 'lucide-react'

const licenses = [
  { name: 'Next.js', description: 'MIT License · App Router & streaming primitives' },
  { name: 'React', description: 'MIT License · UI composition model powering this shell' },
  { name: 'Tailwind CSS', description: 'MIT License · Utility styling for the navy/orange system' },
]

export default function LicensesPage() {
  return (
    <PageShell
      theme="classifieds"
      eyebrow="Open source"
      title="Licenses & acknowledgements"
      description="We stand on the shoulders of extraordinary OSS communities—listed here with the same structured layout as the rest of the classifieds marketing pages."
    >
      <Card className="rounded-[1.35rem] border border-[#1A2B6D]/10 bg-white shadow-[0_20px_55px_rgba(26,43,109,0.08)]">
        <CardContent className="space-y-4 p-6 sm:p-8">
          <div className="flex items-center gap-3 rounded-2xl border border-[#1A2B6D]/10 bg-[#f6f8fc] px-4 py-3 text-sm text-slate-600">
            <Code2 className="h-5 w-5 text-[#1A2B6D]" />
            Dependencies inherit their own notices—this table highlights the pillars of our stack.
          </div>
          <div className="space-y-3">
            {licenses.map((license) => (
              <div
                key={license.name}
                className="rounded-2xl border border-[#1A2B6D]/10 bg-[#f6f8fc] px-5 py-4 transition hover:border-[#F06529]/40"
              >
                <h3 className="font-sans text-base font-semibold text-[#0f1a45]">{license.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{license.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
