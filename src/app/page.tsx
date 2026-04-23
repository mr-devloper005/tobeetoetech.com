import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Briefcase, Building2, Car, CheckCircle2, FileText, Home, Image as ImageIcon, Laptop, LayoutGrid, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getEditorialTone() {
  return {
    shell: 'bg-[#fbf6ee] text-[#241711]',
    panel: 'border border-[#dcc8b7] bg-[#fffdfa] shadow-[0_24px_60px_rgba(77,47,27,0.08)]',
    soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
    muted: 'text-[#6e5547]',
    title: 'text-[#241711]',
    badge: 'bg-[#241711] text-[#fff1e2]',
    action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    actionAlt: 'border border-[#dcc8b7] bg-transparent text-[#241711] hover:bg-[#f5e7d7]',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

const browseCategories = [
  { label: 'Mobiles', href: '/classifieds?category=mobiles' },
  { label: 'Furniture', href: '/classifieds?category=furniture' },
  { label: 'Appliances', href: '/classifieds?category=appliances' },
  { label: 'Vehicles', href: '/classifieds?category=vehicles' },
  { label: 'Jobs', href: '/classifieds?category=jobs' },
  { label: 'Property', href: '/classifieds?category=property' },
  { label: 'Services', href: '/classifieds?category=services' },
  { label: 'Electronics', href: '/classifieds?category=electronics' },
] as const

const heroCategories = [
  { title: 'Electronics', blurb: 'Phones, laptops, and gadgets nearby.', href: '/classifieds?category=electronics', icon: Laptop, cta: 'Browse electronics' },
  { title: 'Vehicles', blurb: 'Cars, bikes, and parts from local sellers.', href: '/classifieds?category=vehicles', icon: Car, cta: 'Browse vehicles' },
  { title: 'Property', blurb: 'Rentals and sales across your area.', href: '/classifieds?category=property', icon: Home, cta: 'Browse property' },
  { title: 'Jobs', blurb: 'Roles, gigs, and shifts worth applying to.', href: '/classifieds?category=jobs', icon: Briefcase, cta: 'Browse jobs' },
] as const

function DirectoryHome({ primaryTask, enabledTasks: _enabledTasks, listingPosts, classifiedPosts, profilePosts: _profilePosts, brandPack: _brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const ads = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 12)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const spotlight = ads[0]
  const recent = ads.slice(0, 6)

  return (
    <main className="bg-white text-[#0f1a45]">
      <section className="relative overflow-hidden bg-[#1A2B6D] text-white">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#F06529]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">Trusted local classifieds</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-sans text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.95)' }}>
                  Find
                </span>{' '}
                <span className="text-white">everything you need</span>{' '}
                <span className="text-white/90">in your city.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">{SITE_CONFIG.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F06529] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(240,101,41,0.45)] transition hover:bg-[#e55a24]"
                >
                  Search ads
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={primaryTask?.route || '/classifieds'}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Browse categories
                </Link>
              </div>
            </div>
            <Link
              href="/create/classified"
              className="hidden items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-5 text-center text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15 lg:inline-flex"
            >
              Post a free ad in minutes — photos, price, and location.
            </Link>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {heroCategories.map((cat) => (
              <div
                key={cat.title}
                className="flex flex-col rounded-[1.25rem] border border-white/15 bg-white/[0.07] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <cat.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="mt-4 font-sans text-lg font-semibold tracking-tight">{cat.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">{cat.blurb}</p>
                <Link
                  href={cat.href}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#F06529] hover:border-[#F06529]"
                >
                  {cat.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
          <aside className="rounded-[1.25rem] border border-[#1A2B6D]/10 bg-[#f6f8fc] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1A2B6D]/60">Categories</p>
            <nav className="mt-4 space-y-1">
              {browseCategories.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#0f1a45] transition hover:bg-white hover:text-[#1A2B6D]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link href="/classifieds" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#1A2B6D] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#14245a]">
              View all
            </Link>
          </aside>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1A2B6D]/55">Featured</p>
            <h2 className="mt-2 max-w-2xl font-sans text-3xl font-bold tracking-[-0.03em] text-[#0f1a45]">Ad of the day — hand-picked for visibility and fair pricing.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
              Fresh classifieds from people nearby. Jump in, message sellers safely, and close deals without leaving the platform rhythm you already know.
            </p>
            {spotlight ? (
              <Link
                href={getTaskHref(featuredTaskKey, spotlight.slug)}
                className="mt-8 block overflow-hidden rounded-[1.35rem] border border-[#1A2B6D]/10 bg-white shadow-[0_28px_70px_rgba(26,43,109,0.1)]"
              >
                <div className="relative aspect-[21/9] min-h-[200px] w-full sm:aspect-[2.4/1]">
                  <ContentImage src={getPostImage(spotlight)} alt={spotlight.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a45]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">Spotlight listing</p>
                    <h3 className="mt-2 font-sans text-2xl font-bold text-white sm:text-3xl">{spotlight.title}</h3>
                    <p className="mt-2 max-w-xl text-sm text-white/85">{spotlight.summary || 'Open the ad for full details, photos, and seller contact preferences.'}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#F06529]">
                      View this ad
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="mt-8 flex min-h-[220px] items-center justify-center rounded-[1.35rem] border border-dashed border-[#1A2B6D]/20 bg-[#f6f8fc] p-8 text-center text-sm text-slate-600">
                New featured ads will appear here as soon as listings go live.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-[#1A2B6D]/8 bg-[#f6f8fc]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1A2B6D]/55">Recent listings</p>
              <h2 className="mt-2 font-sans text-3xl font-bold tracking-[-0.03em] text-[#0f1a45]">Trusted sellers, clear photos, straight descriptions.</h2>
            </div>
            <Link href="/classifieds" className="text-sm font-semibold text-[#F06529] hover:underline">
              See all classifieds
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.length ? (
              recent.map((post) => <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />)
            ) : (
              <p className="text-sm text-slate-600">Listings will show up here once your catalog syncs.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { value: '50k+', label: 'Active ads' },
            { value: '10k+', label: 'Daily visitors' },
            { value: '100%', label: 'Seller transparency tools' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[1.25rem] border border-[#1A2B6D]/10 bg-white p-6 text-center shadow-sm">
              <p className="font-sans text-3xl font-bold text-[#1A2B6D]">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1A2B6D]/55">Plans</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-center font-sans text-3xl font-bold tracking-[-0.03em] text-[#0f1a45]">Pick how long you want your ad to shine.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {[
              {
                name: 'Basic',
                price: 'Free',
                blurb: 'Great for quick sales and one-off items.',
                features: ['7-day live window', 'Up to 2 photos', 'Standard placement'],
                cta: 'Start free',
                href: '/create/classified',
                highlight: false,
              },
              {
                name: 'Premium',
                price: 'Paid',
                blurb: 'More exposure for higher-intent buyers.',
                features: ['30-day live window', 'Up to 10 photos', 'Featured tag on browse'],
                cta: 'Go premium',
                href: '/create/classified',
                highlight: true,
              },
              {
                name: 'Business',
                price: 'Paid',
                blurb: 'For shops posting inventory at scale.',
                features: ['Unlimited active ads', 'Verified badge', 'Priority support'],
                cta: 'Talk to us',
                href: '/help',
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-[1.25rem] border p-7 ${
                  plan.highlight ? 'border-[#1A2B6D] bg-[#1A2B6D] text-white shadow-[0_28px_70px_rgba(26,43,109,0.25)]' : 'border-[#1A2B6D]/10 bg-[#f6f8fc]'
                }`}
              >
                <h3 className="font-sans text-xl font-bold">{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.highlight ? 'text-white/80' : 'text-slate-600'}`}>{plan.blurb}</p>
                <p className="mt-4 font-sans text-2xl font-bold text-[#F06529]">{plan.price}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? 'text-[#F06529]' : 'text-[#1A2B6D]'}`} />
                      <span className={plan.highlight ? 'text-white/90' : 'text-[#0f1a45]'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    plan.highlight ? 'bg-[#F06529] text-white hover:bg-[#e55a24]' : 'bg-[#F06529] text-white hover:bg-[#e55a24]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts, supportTasks }: { primaryTask?: EnabledTask; articlePosts: SitePost[]; supportTasks: EnabledTask[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <FileText className="h-3.5 w-3.5" />
              Reading-first publication
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Essays, analysis, and slower reading designed like a publication, not a dashboard.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                About the publication
              </Link>
            </div>
          </div>

          <aside className={`rounded-[2rem] p-6 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Inside this issue</p>
            <div className="mt-5 space-y-5">
              {side.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="block border-b border-black/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-60">Feature</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Long-form perspective with a calmer reading rhythm.'}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {lead ? (
          <div className={`mt-12 overflow-hidden rounded-[2.5rem] ${tone.panel}`}>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] overflow-hidden">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Lead story</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{lead.title}</h2>
                <p className={`mt-4 text-sm leading-8 ${tone.muted}`}>{lead.summary || 'A more deliberate lead story surface with room for a proper narrative setup.'}</p>
                <Link href={`/articles/${lead.slug}`} className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportTasks.slice(0, 3).map((task) => (
            <Link key={task.key} href={task.route} className={`rounded-[1.8rem] p-6 ${tone.soft}`}>
              <h3 className="text-xl font-semibold">{task.label}</h3>
              <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
