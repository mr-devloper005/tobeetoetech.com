import { Mail, MapPin, Phone, Tag, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4f6fb_100%)] text-[#0f1a45]',
      panel: 'rounded-[1.35rem] border border-[#1A2B6D]/10 bg-white shadow-[0_24px_60px_rgba(26,43,109,0.08)]',
      soft: 'rounded-[1.25rem] border border-[#1A2B6D]/10 bg-[#f6f8fc]',
      muted: 'text-slate-600',
      action: 'inline-flex h-12 w-full items-center justify-center rounded-full bg-[#F06529] px-6 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(240,101,41,0.35)] transition hover:bg-[#e55a24]',
      hero: 'bg-[#1A2B6D] text-white',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'min-h-screen bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa] rounded-[1.35rem]',
      soft: 'border border-[#e6d6c8] bg-[#fff4e8] rounded-[1.25rem]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b] inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold',
      hero: 'bg-[#2f1d16] text-[#fff4e4]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'min-h-screen bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6 rounded-[1.35rem]',
      soft: 'border border-white/10 bg-white/5 rounded-[1.25rem]',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8] inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold',
      hero: 'bg-[#0b1a2e] text-white',
    }
  }
  return {
    shell: 'min-h-screen bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] rounded-[1.35rem]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db] rounded-[1.25rem]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b] inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold',
    hero: 'bg-[#5b2b3b] text-[#fff0f5]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'support@tobeetoetech.com'
  const emailHref = `mailto:${contactEmail}`
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const heroEmailAction = tone.action.replace('w-full', 'w-fit')
  const lanes =
    productKind === 'directory'
      ? [
          {
            icon: Tag,
            title: 'Seller & buyer support',
            body: 'Questions about posting fees, editing live ads, or resolving a meetup? We route you to humans who ship classifieds daily.',
          },
          {
            icon: Phone,
            title: 'Partnerships & promos',
            body: 'Planning a city launch, campus takeover, or featured category week? Tell us the audience—we will co-design the bundle.',
          },
          {
            icon: MapPin,
            title: 'Coverage & safety',
            body: 'Need help expanding to a new metro or reporting suspicious activity? Share links and timestamps—we investigate quickly.',
          },
        ]
      : productKind === 'editorial'
        ? [
            { icon: Mail, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: MessageSquare, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Tag, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: Tag, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Mail, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: MapPin, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Mail, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: MessageSquare, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Tag, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  const isDirectory = productKind === 'directory'

  return (
    <div className={tone.shell}>
      <NavbarShell />
      <main>
        <section className={`relative overflow-hidden ${tone.hero}`}>
          {isDirectory ? (
            <>
              <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#F06529]/25 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            </>
          ) : null}
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] opacity-70">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 max-w-3xl font-sans text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              {isDirectory
                ? 'Tell us what you are listing—or what you wish you could find.'
                : 'A support lane that mirrors the product you are using.'}
            </h1>
            <p className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${isDirectory ? 'text-white/80' : 'opacity-80'}`}>
              {isDirectory
                ? 'We read every note. Drop links to ads, screenshots, or city names so we can respond with the right next step—not a canned macro.'
                : 'Tell us what you are trying to publish, fix, or launch. We route it through the right lane instead of forcing every request into the same support bucket.'}
            </p>
            <a href={emailHref} className={`mt-8 gap-2 ${heroEmailAction}`}>
              <Mail className="h-4 w-4" />
              Email us
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`p-6 sm:p-7 ${tone.soft}`}>
                  <lane.icon className={`h-5 w-5 ${isDirectory ? 'text-[#F06529]' : ''}`} />
                  <h2 className="mt-4 font-sans text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>

            <div className={`p-7 sm:p-8 ${tone.panel}`}>
              <h2 className="font-sans text-2xl font-bold tracking-tight">Send a message</h2>
              <p className={`mt-2 text-sm ${tone.muted}`}>We typically reply within one business day.</p>
              <a
                href={emailHref}
                className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                  isDirectory
                    ? 'border-[#1A2B6D]/12 bg-[#f6f8fc] text-[#0f1a45] hover:border-[#F06529]/40'
                    : 'border-current/15 hover:bg-current/5'
                }`}
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
              <ContactLeadForm />
              {isDirectory ? (
                <p className="mt-5 text-center text-xs text-slate-500">
                  Prefer self-serve?{' '}
                  <Link href="/help" className="font-semibold text-[#F06529] hover:underline">
                    Visit the help center
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
