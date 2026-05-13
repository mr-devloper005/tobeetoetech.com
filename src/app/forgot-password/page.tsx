"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4f6fb_100%)] text-[#0f1a45]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden bg-[#1A2B6D] text-white">
          <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-[#F06529]/22 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/65">Account recovery</p>
            <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight sm:text-4xl">Reset access without losing momentum.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80">
              Same navy + orange cues as the homepage—just a tighter flow so you can get back to posting or replying to buyers.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-lg px-4 py-14 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[1.35rem] border border-[#1A2B6D]/10 bg-white p-8 shadow-[0_24px_60px_rgba(26,43,109,0.1)]"
          >
            <Link
              href="/login"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#1A2B6D]/70 transition hover:text-[#F06529]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>

            {!isSubmitted ? (
              <>
                <h2 className="font-sans text-2xl font-bold text-[#0f1a45]">Forgot your password?</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Enter the email tied to your account. We will send a reset link that expires after a short window for safety.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#0f1a45]">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1A2B6D]/45" />
                      <Input
                        id="email"
                        type="email"
                    placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 border-[#1A2B6D]/15 bg-[#f6f8fc] pl-10 text-[#0f1a45] placeholder:text-slate-400 focus-visible:ring-[#F06529]/35"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full bg-[#F06529] font-semibold text-white hover:bg-[#e55a24]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending…" : "Email reset link"}
                  </Button>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F06529]/15">
                  <CheckCircle2 className="h-8 w-8 text-[#F06529]" />
                </div>
                <h2 className="font-sans text-2xl font-bold text-[#0f1a45]">Check your inbox</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  If <strong className="text-[#0f1a45]">{email}</strong> matches an account, you will see a reset link arrive shortly.
                </p>
                <Button asChild variant="outline" className="mt-8 w-full border-[#1A2B6D]/20 text-[#0f1a45] hover:bg-[#f6f8fc]">
                  <Link href="/login">Return to login</Link>
                </Button>
                <p className="mt-6 text-sm text-slate-500">
                  Wrong address?{" "}
                  <button type="button" onClick={() => setIsSubmitted(false)} className="font-semibold text-[#F06529] hover:underline">
                    Try again
                  </button>
                </p>
              </motion.div>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
