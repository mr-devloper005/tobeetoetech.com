'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
  theme = 'default',
  eyebrow,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  theme?: 'default' | 'classifieds'
  eyebrow?: string
}) {
  if (theme === 'classifieds') {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4f6fb_45%,#eef1f8_100%)] text-[#0f1a45]">
        <NavbarShell />
        <main>
          <section className="relative overflow-hidden bg-[#1A2B6D] text-white">
            <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#F06529]/22 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
              {eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/65">{eyebrow}</p>
              ) : null}
              <div className="mt-2 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                <div className="max-w-2xl">
                  <h1 className="font-sans text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                    {title}
                  </h1>
                  {description ? (
                    <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">{description}</p>
                  ) : null}
                </div>
                {actions ? (
                  <div className="w-full shrink-0 rounded-[1.25rem] border border-white/20 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:max-w-md lg:max-w-xl">
                    {actions}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">{children}</section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
