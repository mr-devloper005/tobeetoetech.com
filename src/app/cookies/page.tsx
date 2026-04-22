import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie, LineChart, SlidersHorizontal } from 'lucide-react'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Authentication, fraud prevention, and session continuity so posting an ad never drops mid-save.',
    icon: Cookie,
  },
  {
    title: 'Analytics cookies',
    body: 'Anonymous usage to see which categories need better filters—never sold, always aggregated.',
    icon: LineChart,
  },
  {
    title: 'Preference cookies',
    body: 'Remember city, recent searches, and UI density so repeat visits feel instantly familiar.',
    icon: SlidersHorizontal,
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      theme="classifieds"
      eyebrow="Transparency"
      title="Cookie policy with the same calm cadence as home."
      description="Understand what we store, why it exists, and how to toggle preferences—wrapped in the navy + white + orange system you already know."
    >
      <div className="grid gap-6 md:grid-cols-3">
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
      <Card className="mt-8 rounded-[1.35rem] border border-[#F06529]/25 bg-[#fff8f4]">
        <CardContent className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#F06529]">Last updated · March 16, 2026</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Need to revoke consent? Clear site data in your browser or contact support—we will walk you through enterprise setups
            too.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  )
}
