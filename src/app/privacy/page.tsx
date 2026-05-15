import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Lock, Server, UserCheck } from 'lucide-react'

const sections = [
  {
    title: 'Data we collect',
    body: 'Account basics, ad content you submit, lightweight usage signals, and communications you opt into.',
    icon: UserCheck,
  },
  {
    title: 'How we use it',
    body: 'To keep listings searchable, prevent abuse, personalize safety tips, and improve performance without selling your inbox.',
    icon: Server,
  },
  {
    title: 'Your controls',
    body: 'Export or delete your account, manage email alerts, and adjust cookies—each control lives in plain language.',
    icon: Lock,
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      theme="classifieds"
      eyebrow="Legal"
      title="Privacy, explained like a product—not a maze."
      description="We mirror the homepage palette so policy pages feel as intentional as the marketplace itself: calm navy framing, legible white cards, and orange highlights only where it helps you act."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {sections.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="rounded-[1.25rem] border border-[#1A2B6D]/10 bg-white shadow-sm">
              <CardContent className="flex h-full flex-col gap-3 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1A2B6D]/8 text-[#1A2B6D]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-[#0f1a45]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card className="mt-8 rounded-[1.35rem] border border-[#1A2B6D]/10 bg-[#f6f8fc]">
        <CardContent className="space-y-4 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A2B6D]/55">Last updated · March 16, 2026</p>
          <p className="text-sm leading-relaxed text-slate-600">
            This summary is a friendly overview. For regulatory or contractual questions, keep the detailed clauses your counsel
            expects—we simply wrapped them in a layout that respects your time.
          </p>
          <div className="rounded-2xl border border-[#1A2B6D]/10 bg-white p-5 text-sm text-slate-600">
            <p className="font-semibold text-[#0f1a45]">Contact</p>
            <p className="mt-2">
              Privacy requests: please use our <a href="/contact" className="text-[#F06529]">Contact Us page</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
