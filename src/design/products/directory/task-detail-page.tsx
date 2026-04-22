import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, MessageCircle, Sparkles } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const isClassified = task === 'classified'
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  const heroBadge = isClassified ? 'Live classified' : 'Directory listing'
  const heroAboutTitle = isClassified ? 'Why this ad stands out' : 'Structured details instead of a generic content block.'
  const heroAboutLead = isClassified
    ? 'We surface seller intent, location, and proof points together so you can decide in seconds—not after ten tabs.'
    : 'Structured details instead of a generic content block.'
  const trustTitle = isClassified ? 'Buyer checklist' : 'Quick trust cues'
  const trustItems = isClassified
    ? ['Photos match the headline', 'Price aligned with neighborhood comps', 'Seller responds on-platform first']
    : ['Clear contact details', 'Stronger business framing', 'Map and location cues', 'Related surfaces nearby']
  const relatedTitle = isClassified ? 'More ads worth a look' : 'Keep browsing nearby matches.'
  const relatedSubtitle = isClassified ? 'Same category, fresher posts' : 'Related surfaces'

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4f6fb_100%)] text-[#0f1a45]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1A2B6D]/75 transition hover:text-[#F06529]"
        >
          ← Back to {taskLabel}
        </Link>

        {isClassified ? (
          <section className="relative mb-10 overflow-hidden rounded-[1.5rem] bg-[#1A2B6D] p-8 text-white shadow-[0_28px_70px_rgba(26,43,109,0.35)] sm:p-10">
            <div className="pointer-events-none absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#F06529]/25 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/65">{heroBadge}</p>
                <h1 className="mt-4 font-sans text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-[2.5rem]">{post.title}</h1>
                <p className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    <Tag className="h-3.5 w-3.5" />
                    {category || taskLabel}
                  </span>
                  {location ? (
                    <span className="inline-flex items-center gap-2 text-white/85">
                      <MapPin className="h-4 w-4 text-[#F06529]" />
                      {location}
                    </span>
                  ) : null}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {phone ? (
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F06529] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(240,101,41,0.45)] transition hover:bg-[#e55a24]"
                    >
                      Call seller
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  <Link
                    href={taskRoute}
                    className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                  >
                    Browse similar
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] border border-white/20 shadow-2xl">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
            </div>
          </section>
        ) : null}

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div
              className={`overflow-hidden rounded-[2.2rem] border bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ${
                isClassified ? 'border-[#1A2B6D]/10' : 'border-slate-200'
              }`}
            >
              {isClassified ? (
                images.length > 1 ? (
                  <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
                    {images.slice(1, 7).map((image) => (
                      <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#1A2B6D]/10 bg-slate-50">
                        <ContentImage src={image} alt={post.title} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-sm text-slate-600">
                    More photos will appear here when the seller uploads extras—hero image is shown above.
                  </div>
                )
              ) : (
                <>
                  <div className="relative h-[420px] overflow-hidden bg-slate-100">
                    <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                  </div>
                  {images.length > 1 ? (
                    <div className="grid grid-cols-4 gap-3 p-4">
                      {images.slice(1, 5).map((image) => (
                        <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                          <ContentImage src={image} alt={post.title} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </div>

            <div
              className={`mt-8 rounded-[2rem] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ${
                isClassified ? 'border border-[#1A2B6D]/10 bg-white' : 'border border-slate-200 bg-white'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A2B6D]/55">About this {isClassified ? 'ad' : task}</p>
              <h2 className="mt-3 font-sans text-3xl font-bold tracking-[-0.04em] text-[#0f1a45]">{heroAboutTitle}</h2>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">{heroAboutLead}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 whitespace-pre-line">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div
                      key={item}
                      className={`rounded-[1.4rem] px-4 py-4 text-sm ${
                        isClassified ? 'border border-[#1A2B6D]/10 bg-[#f6f8fc] text-slate-700' : 'border border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            {!isClassified ? (
              <div
                className={`rounded-[2rem] p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ${
                  isClassified ? 'border border-[#1A2B6D]/10 bg-white' : 'border border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category || taskLabel}</p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[#0f1a45]">{post.title}</h1>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {location ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <MapPin className="h-4 w-4" /> {location}
                    </div>
                  ) : null}
                  {phone ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <Phone className="h-4 w-4" /> {phone}
                    </div>
                  ) : null}
                  {email ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <Mail className="h-4 w-4" /> {email}
                    </div>
                  ) : null}
                  {website ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <Globe className="h-4 w-4" /> {website}
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {website ? (
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Visit website <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  <Link
                    href={taskRoute}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
                  >
                    Browse more
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-[#1A2B6D]/10 bg-white p-7 shadow-[0_24px_60px_rgba(26,43,109,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A2B6D]/55">Contact seller</p>
                <div className="mt-5 grid gap-3">
                  {location ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-[#1A2B6D]/10 bg-[#f6f8fc] px-4 py-3 text-sm text-slate-700">
                      <MapPin className="h-4 w-4 text-[#F06529]" /> {location}
                    </div>
                  ) : null}
                  {phone ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-[#1A2B6D]/10 bg-[#f6f8fc] px-4 py-3 text-sm text-slate-700">
                      <Phone className="h-4 w-4 text-[#F06529]" /> {phone}
                    </div>
                  ) : null}
                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 rounded-2xl border border-[#1A2B6D]/10 bg-[#f6f8fc] px-4 py-3 text-sm font-medium text-[#0f1a45] transition hover:border-[#F06529]/40"
                    >
                      <Mail className="h-4 w-4 text-[#F06529]" /> {email}
                    </a>
                  ) : null}
                  {website ? (
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-[#1A2B6D]/10 bg-[#f6f8fc] px-4 py-3 text-sm font-medium text-[#0f1a45] transition hover:border-[#F06529]/40"
                    >
                      <Globe className="h-4 w-4 text-[#F06529]" /> {website}
                    </a>
                  ) : null}
                </div>
                <div className="mt-6 rounded-2xl border border-dashed border-[#F06529]/35 bg-[#fff8f4] p-4 text-sm text-slate-700">
                  <MessageCircle className="mb-2 h-5 w-5 text-[#F06529]" />
                  Prefer messaging here first—keep phone/email for serious buyers only.
                </div>
              </div>
            )}

            {mapEmbedUrl ? (
              <div
                className={`overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] ${
                  isClassified ? 'border border-[#1A2B6D]/10' : 'border border-slate-200'
                }`}
              >
                <div className={`border-b px-6 py-4 ${isClassified ? 'border-[#1A2B6D]/10' : 'border-slate-200'}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}

            <div
              className={`rounded-[2rem] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ${
                isClassified ? 'border border-[#1A2B6D]/10 bg-[#f6f8fc]' : 'border border-slate-200 bg-white'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A2B6D]/55">{trustTitle}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className={`flex items-start gap-2 rounded-[1.3rem] px-4 py-4 text-sm ${
                      isClassified ? 'border border-[#1A2B6D]/10 bg-white text-slate-700' : 'border border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#F06529]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className={`flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between ${isClassified ? 'border-[#1A2B6D]/10' : 'border-slate-200'}`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A2B6D]/55">{relatedSubtitle}</p>
                <h2 className="mt-3 font-sans text-3xl font-bold tracking-[-0.04em] text-[#0f1a45]">{relatedTitle}</h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1A2B6D]/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1A2B6D]">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
