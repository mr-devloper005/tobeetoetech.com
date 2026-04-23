import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { LifeBuoy, MessageCircle, Search, ShieldCheck } from 'lucide-react'
import { mockFaqs } from '@/data/mock-data'

const playbooks = [
  {
    title: 'Post faster',
    description: 'Title, price, photos, and pickup preferences—checklists so your first ad ships in one sitting.',
    icon: MessageCircle,
  },
  {
    title: 'Search smarter',
    description: 'Combine keywords with categories, save frequent queries, and jump back to results without losing context.',
    icon: Search,
  },
  {
    title: 'Stay safe',
    description: 'Meet in public places, verify identities for high-value items, and report anything that feels off—right from the ad.',
    icon: ShieldCheck,
  },
  {
    title: 'Need a human?',
    description: 'Escalations route to humans who know the product—not bots reading from unrelated scripts.',
    icon: LifeBuoy,
  },
]

export default function HelpPage() {
  return (
    <PageShell
      theme="classifieds"
      eyebrow="Support hub"
      title="Help built around how you buy and sell locally."
      description="Guides, FAQs, and quick wins—styled with the same navy, white, and orange rhythm as the homepage so help never feels like an afterthought."
      actions={
        <Button className="w-full bg-[#F06529] font-semibold text-white hover:bg-[#e55a24] sm:w-auto" asChild>
          <Link href="/contact">Talk to support</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1A2B6D]/55">Playbooks</p>
          <h2 className="mt-2 font-sans text-2xl font-bold text-[#0f1a45] sm:text-3xl">Pick a lane—we will meet you there.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {playbooks.map((topic) => (
              <Card
                key={topic.title}
                className="rounded-[1.25rem] border border-[#1A2B6D]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1A2B6D]/8 text-[#1A2B6D]">
                    <topic.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold text-[#0f1a45]">{topic.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Card className="rounded-[1.35rem] border border-[#1A2B6D]/10 bg-[#f6f8fc] shadow-inner">
          <CardContent className="p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-sans text-xl font-bold text-[#0f1a45]">FAQ</h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1A2B6D] shadow-sm">
                Updated weekly
              </span>
            </div>
            <Accordion type="single" collapsible className="mt-5 space-y-2">
              {mockFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-xl border border-[#1A2B6D]/10 bg-white px-3 data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-[#0f1a45] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-slate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-6 rounded-2xl border border-dashed border-[#1A2B6D]/25 bg-white/80 p-4 text-sm text-slate-600">
              Still stuck?{' '}
              <Link href="/contact" className="font-semibold text-[#F06529] hover:underline">
                Send us the ad link
              </Link>{' '}
              and we will investigate.
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
