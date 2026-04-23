'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { loadFromStorage, storageKeys } from '@/lib/local-storage'
import type { User } from '@/types'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  submitClassName: string
}

export function ClassifiedsLoginForm({ submitClassName }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Enter your email and password.', variant: 'destructive' })
      return
    }
    await login(email.trim(), password)
    const stored = loadFromStorage<User | null>(storageKeys.user, null)
    if (stored && stored.email === email.trim()) {
      toast({ title: 'Signed in', description: `Welcome back, ${stored.name}.` })
      router.push('/')
      router.refresh()
      return
    }
    toast({ title: 'Sign in failed', description: 'Check your credentials and try again.', variant: 'destructive' })
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <input
        className="h-12 rounded-2xl border border-[#1A2B6D]/15 bg-white px-4 text-sm text-[#0f1a45] shadow-sm outline-none ring-[#F06529]/30 placeholder:text-slate-400 focus:ring-2"
        placeholder="Email address"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <input
        className="h-12 rounded-2xl border border-[#1A2B6D]/15 bg-white px-4 text-sm text-[#0f1a45] shadow-sm outline-none ring-[#F06529]/30 placeholder:text-slate-400 focus:ring-2"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit" disabled={isLoading} className={submitClassName}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

export function ClassifiedsLoginLinks({ mutedClassName }: { mutedClassName: string }) {
  return (
    <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 text-sm ${mutedClassName}`}>
      <Link href="/forgot-password" className="font-medium hover:underline">
        Forgot password?
      </Link>
      <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#F06529] hover:underline">
        Create account
      </Link>
    </div>
  )
}
