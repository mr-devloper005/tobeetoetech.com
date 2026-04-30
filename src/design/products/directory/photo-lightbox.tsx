'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'

export function PhotoLightbox({ images, title }: { images: string[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const activeImage = openIndex === null ? null : images[openIndex]

  useEffect(() => {
    if (openIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [openIndex])

  if (!images.length) return null

  return (
    <>
      <div className="flex min-h-[190px] items-center justify-center p-5 sm:min-h-[230px]">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="group relative aspect-[4/3] w-full max-w-[360px] overflow-hidden border border-[#d8e1eb] bg-[#eef3f8] focus:outline-none focus:ring-2 focus:ring-[#2f72af] focus:ring-offset-2"
          aria-label={`Open ${title} photo`}
        >
          <ContentImage
            src={images[0]}
            alt={title}
            fill
            className="object-contain transition duration-200 group-hover:scale-[1.02]"
            intrinsicWidth={900}
            intrinsicHeight={675}
            priority
          />
        </button>
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-3 gap-2 border-t border-[#d8e1eb] bg-[#f8fafc] p-3 sm:grid-cols-5">
          {images.slice(1, 6).map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setOpenIndex(index + 1)}
              className="group relative aspect-[4/3] overflow-hidden border border-[#d8e1eb] bg-white focus:outline-none focus:ring-2 focus:ring-[#2f72af] focus:ring-offset-2"
              aria-label={`Open ${title} photo ${index + 2}`}
            >
              <ContentImage
                src={image}
                alt={`${title} image ${index + 2}`}
                fill
                className="object-cover transition duration-200 group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      ) : null}

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo preview`}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f2937] shadow-lg transition hover:bg-[#eef3f8] focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close photo preview"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[86vh] w-full max-w-5xl overflow-hidden bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[78vh] max-h-[760px] min-h-[280px] w-full bg-[#f8fafc]">
              <ContentImage
                src={activeImage}
                alt={`${title} enlarged photo`}
                fill
                className="object-contain"
                intrinsicWidth={1600}
                intrinsicHeight={1200}
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
