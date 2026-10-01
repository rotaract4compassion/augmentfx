'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from '@/lib/supabase/auth'

type Role = 'participant' | 'admin'

const BLUE = 'var(--royal)'
const MAGENTA = 'var(--gold)'
const YELLOW = 'var(--gold)'

const inp = [
  'w-full bg-white border-[1.5px] border-royal-night/[.12] rounded-[12px]',
  'px-4 py-[15px] font-sans text-body text-royal-night',
  'placeholder:text-royal-night/30',
  'focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10',
  'transition-all duration-200',
].join(' ')

const lbl = 'block font-num font-extrabold text-[10px] text-royal-night/55 uppercase tracking-[.08em] mb-[9px]'

export default function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const nextPath     = searchParams.get('next') ?? '/dashboard'

  const [role,     setRole]     = useState<Role>('participant')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  async function handleSubmit() {
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true)
    setError(null)
    const { error: signInError } = await signIn(email, password)
    if (signInError) {
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }
    const dest = role === 'admin' ? '/admin/overview' : nextPath
    router.push(dest)
    router.refresh()
  }

  return (
    <div className="w-full animate-fade-up">
      <div className="mb-7">
        <p className="font-sans text-[10px] font-extrabold uppercase tracking-[.18em] mb-2" style={{ color: MAGENTA }}>
          Welcome back
        </p>
        <h2 className="font-serif text-[32px] font-bold italic text-royal-night leading-[1.08] tracking-[-0.02em]">
           Login <span style={{ color: MAGENTA }}>to your account.</span>
        </h2>
        <p className="font-sans text-[13px] text-royal-night/55 mt-2 leading-relaxed">
          Continue your journey. Track your progress,
          manage your fundraising and more.
        </p>
      </div>

      <div className="flex bg-royal/[.08] border border-royal/[.14] rounded-[12px] p-[3px] mb-[26px]">
        {(['participant', 'admin'] as const).map(r => (
          <button
            key={r}
            type="button"
            onClick={() => { setRole(r); setError(null) }}
            className="flex-1 rounded-[10px] py-[10px] font-sans text-[12px] font-extrabold transition-all focus:outline-none"
            style={role === r ? { background: BLUE, color: '#fff' } : { color: `${BLUE}99` }}
          >
            {r === 'participant' ? 'Participant' : 'HQ Admin'}
          </button>
        ))}
      </div>

      <div className="mb-5">
        <label className={lbl}>Email</label>
        <input type="email" autoComplete="email" placeholder="you@example.com" value={email}
          onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} className={inp} />
      </div>

      <div className="mb-0">
        <div className="flex items-center justify-between mb-[9px]">
          <label className={lbl.replace(' mb-[9px]', '')}>Password</label>
          <Link href="/reset-password" className="font-sans text-[11.5px] font-semibold hover:opacity-75" style={{ color: MAGENTA }}>
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input type={showPass ? 'text' : 'password'} autoComplete="current-password" placeholder="Your password" value={password}
            onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} className={`${inp} pr-[54px]`} />
          <button type="button" onClick={() => setShowPass(p => !p)}
            className="absolute right-4 top-1/2 -translate-y-1/2 font-num font-bold text-[11px] tracking-[.05em] hover:opacity-70 focus:outline-none"
            style={{ color: BLUE }}>
            {showPass ? 'HIDE' : 'SHOW'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-[12px] bg-gold/[.07] border border-gold/25 px-4 py-3">
          <p className="font-sans text-[13px]" style={{ color: MAGENTA }}>{error}</p>
        </div>
      )}

      <button type="button" onClick={handleSubmit} disabled={loading}
        className="mt-6 w-full rounded-[12px] py-4 font-sans text-[14px] font-extrabold text-royal-night
                   hover:brightness-95 active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none"
        style={{ background: YELLOW }}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-royal-night/30 border-t-[var(--royal-night)] rounded-full animate-spin" />
            Signing in…
          </span>
        ) : `Sign in as ${role === 'admin' ? 'HQ Admin' : 'Participant'}`}
      </button>

      <p className="mt-6 font-sans text-[13px] text-royal-night/50 text-center leading-relaxed">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-extrabold hover:opacity-75" style={{ color: MAGENTA }}>
          Register for Tour de Rotary 2026 →
        </Link>
      </p>
    </div>
  )
}


