import Link from 'next/link'
import {
  BriefcaseBusiness,
  Facebook,
  Globe,
  Image as ImageIcon,
  Linkedin,
  List,
  Mail,
  MapPin,
  Phone,
  Twitter,
  UserRound,
} from 'lucide-react'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { PhotoLightbox } from './photo-lightbox'

const getText = (content: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = content[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  }
  return ''
}

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
  const location = getText(content, ['address', 'location', 'city'])
  const website = getText(content, ['website', 'url'])
  const phone = getText(content, ['phone', 'mobile', 'whatsapp'])
  const email = getText(content, ['email'])
  const author = getText(content, ['author', 'seller', 'sellerName', 'employer', 'company']) || post.authorName || 'Seller'
  const price = getText(content, ['price', 'salary', 'budget', 'rate'])
  const jobType = getText(content, ['jobType', 'job_type', 'type', 'employmentType'])
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const shareUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${taskRoute}/${post.slug}`
  const encodedShareUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(post.title)
  const isClassified = task === 'classified'
  const sectionLabel = isClassified ? 'Images and Visuals' : `${taskLabel} Visuals`
  const descriptionTitle = isClassified ? `Description - ${post.title}` : `About - ${post.title}`
  const detailsRows = [
    ['Seller', author],
    ['Category', category || taskLabel],
    ['Location', location],
    ['Price', price],
    ['Job type', jobType],
    ['Phone', phone],
    ['Email', email],
    ['Website', website],
  ].filter((row): row is [string, string] => Boolean(row[1]))
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: shareUrl,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#3f4b5a]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto w-full max-w-[920px] px-3 py-5 sm:px-5 lg:px-6">
        <Link
          href={taskRoute}
          className="mb-3 inline-flex text-sm font-semibold text-[#2f74b8] underline-offset-4 hover:underline"
        >
          Back to {taskLabel}
        </Link>

        <header className="mb-3 border-b border-[#cbd9e7] pb-3">
          <div>
            <div>
              <h1 className="text-[1.65rem] font-bold leading-tight text-[#3f7fc5] sm:text-[2rem]">
                {post.title}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase text-[#475569]">
                <span>
                  {taskLabel} ID: {post.id}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-[#3f4b5a]">
              <UserRound className="h-4 w-4" />
              {author}
            </span>
            {location ? (
              <span className="inline-flex items-center gap-1 text-[#3f4b5a]">
                <MapPin className="h-4 w-4" />
                {location}
              </span>
            ) : null}
          </div>
        </header>

        <section className="mb-3 border border-[#cbd9e7] bg-white">
          <PanelTitle icon={<ImageIcon className="h-4 w-4" />} title={sectionLabel} />
          <PhotoLightbox images={images} title={post.title} />
        </section>

        <nav className="mb-3 flex items-center gap-1 border border-[#cbd9e7] bg-[#eef3f8] p-2">
          <ShareLink
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
            label="Share on Facebook"
            className="bg-[#3b5998]"
          >
            <Facebook className="h-5 w-5" />
          </ShareLink>
          <ShareLink
            href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`}
            label="Share on Twitter"
            className="bg-[#1da1f2]"
          >
            <Twitter className="h-5 w-5" />
          </ShareLink>
          <ShareLink
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedShareUrl}&title=${encodedTitle}`}
            label="Share on LinkedIn"
            className="bg-[#0077b5]"
          >
            <Linkedin className="h-5 w-5" />
          </ShareLink>
        </nav>

        <section className="mb-3 border border-[#cbd9e7] bg-white">
          <PanelTitle icon={<BriefcaseBusiness className="h-4 w-4" />} title={descriptionTitle} />
          <div className="space-y-3 p-4 text-[15px] leading-7 text-[#3f4b5a] sm:p-5">
            <RichContent
              html={descriptionHtml}
              className="text-[15px] leading-7 text-[#3f4b5a] prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-a:text-[#2f74b8]"
            />
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {website ? (
                <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#2f74b8] underline">
                  <Globe className="h-4 w-4" />
                  Visit Website
                </a>
              ) : null}
              {phone ? (
                <a href={`tel:${phone}`} className="inline-flex items-center gap-1 text-[#2f74b8] underline">
                  <Phone className="h-4 w-4" />
                  Call Seller
                </a>
              ) : null}
              {email ? (
                <a href={`mailto:${email}`} className="inline-flex items-center gap-1 text-[#2f74b8] underline">
                  <Mail className="h-4 w-4" />
                  Email Seller
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {detailsRows.length ? (
          <section className="mb-3 border border-[#cbd9e7] bg-white">
            <PanelTitle icon={<List className="h-4 w-4" />} title="Details" />
            <dl className="divide-y divide-[#e1e8f0] p-4 sm:p-5">
              {detailsRows.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr] sm:gap-6">
                  <dt className="font-bold text-[#4b5563]">{label}</dt>
                  <dd className="break-words text-[#667085]">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {location || mapEmbedUrl ? (
          <section className="mb-3 border border-[#cbd9e7] bg-white">
            <PanelTitle icon={<MapPin className="h-4 w-4" />} title="Location" />
            {location ? <p className="p-4 text-sm font-medium text-[#3f4b5a] sm:p-5">{location}</p> : null}
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                title={`${post.title} map`}
                className="h-[260px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : null}
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between border-b border-[#cbd9e7] pb-2">
              <h2 className="text-xl font-bold text-[#3f7fc5]">More in {category || taskLabel}</h2>
              <Link href={taskRoute} className="text-sm font-semibold text-[#2f74b8] hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

function PanelTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex min-h-8 items-center gap-2 bg-[linear-gradient(180deg,#4e90ce_0%,#2f72af_100%)] px-2.5 py-1.5 text-base font-bold text-white">
      {icon}
      <span className="leading-tight">{title}</span>
    </div>
  )
}

function ShareLink({
  href,
  label,
  className,
  children,
}: {
  href: string
  label: string
  className: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`inline-flex h-8 w-8 items-center justify-center text-white transition hover:brightness-110 ${className}`}
    >
      {children}
    </a>
  )
}
