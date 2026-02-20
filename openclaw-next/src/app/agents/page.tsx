'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type Agent = {
  id: string
  name: string
  tagline: string
  color: string
  accent: string
  skills: string[]
  model: string
}

const agents: Agent[] = [
  {
    id: 'amber-scout',
    name: 'Amber Scout',
    tagline: 'Discovers leads, hands off clean payloads.',
    color: '#f7b500',
    accent: '#ffcf7f',
    model: 'gemini',
    skills: ['ab-test-setup', 'analytics-tracking', 'competitor-alternatives', 'content-strategy', 'offer-grid']
  },
  {
    id: 'rose-writer',
    name: 'Rose Writer',
    tagline: 'Writes outreach with empathy and brevity.',
    color: '#ff4f84',
    accent: '#ff9fbf',
    model: 'claude',
    skills: ['short-copy', 'tone-shift', 'cta-pair', 'persona-weave', 'subject-variants']
  },
  {
    id: 'cyan-surfer',
    name: 'Cyan Surfer',
    tagline: 'Browses sources and drafts summaries.',
    color: '#54d6ff',
    accent: '#9ff2ff',
    model: 'gpt-4.1',
    skills: ['scrape', 'summarize', 'cite', 'quote-extract', 'link-bundle']
  },
  {
    id: 'indigo-custodian',
    name: 'Indigo Custodian',
    tagline: 'Keeps logs tidy and flags anomalies.',
    color: '#8aa0ff',
    accent: '#c0c8ff',
    model: 'gpt-4.1',
    skills: ['log-triage', 'alert-trim', 'handoff', 'status-digest']
  },
  {
    id: 'mint-guide',
    name: 'Mint Guide',
    tagline: 'Guides new users through flows.',
    color: '#8bf2c4',
    accent: '#c1ffd8',
    model: 'gpt-4o-mini',
    skills: ['walkthrough', 'checklist', 'nudge', 'qa-reminder']
  }
]

export default function AgentsPage() {
  const [selected, setSelected] = useState<Agent>(agents[0])
  const [apiBase, setApiBase] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('gpt-4.1')
  const [showToast, setShowToast] = useState(false)
  const [showAllSkills, setShowAllSkills] = useState(false)
  const router = useRouter()

  const skillLine = useMemo(() => selected.skills.join(' • '), [selected])
  const primarySkills = selected.skills.slice(0, 4)
  const remaining = Math.max(selected.skills.length - primarySkills.length, 0)

  const handleDeploy = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
    setTimeout(() => router.push('/agents/live'), 1200)
  }

  return (
    <div className='relative min-h-screen overflow-hidden surface-light px-6 pb-16 md:px-10'>
      <div className='bg-orb orb-left' />
      <div className='bg-orb orb-right' />
      <header className='relative z-10 flex items-center justify-between py-6'>
        <h1 className='text-2xl font-semibold text-slate-900'>Grow your mycelium</h1>
        <div className='pill ghost text-xs'>Step 2 · Configure</div>
      </header>

      <main className='relative z-10 grid gap-8 lg:grid-cols-[1.35fr_1fr]'>
        <section className='rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <p className='text-xs uppercase tracking-wide text-slate-500'>Pick a soul</p>
              <h2 className='text-xl font-semibold text-slate-900'>Choose an agent colorway</h2>
            </div>
            <span className='pill outline text-xs'> {agents.length} options</span>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {agents.map(agent => (
              <button
                key={agent.id}
                onClick={() => setSelected(agent)}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft ${
                  selected.id === agent.id ? 'ring-2 ring-slate-900/60' : ''
                }`}
              >
                <div
                  className='mb-3 h-12 w-12 rounded-full shadow-soft'
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${agent.accent}, ${agent.color} 70%)`
                  }}
                />
                <h3 className='text-base font-semibold text-slate-900'>{agent.name}</h3>
                <p className='text-sm text-slate-600'>{agent.tagline}</p>
                <div className='mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600'>
                  {agent.skills.map(skill => (
                    <span key={skill} className='rounded-full bg-slate-100 px-3 py-1'>
                      {skill}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className='rounded-3xl bg-white/85 p-6 shadow-soft backdrop-blur'>
          <p className='text-xs uppercase tracking-wide text-slate-500'>Configure & deploy</p>
          <h2 className='mt-2 text-xl font-semibold text-slate-900'>{selected.name}</h2>
          <p className='text-sm text-slate-600'>{selected.tagline}</p>

          <div className='mt-4 rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-sm text-slate-700'>
            <div className='font-semibold text-slate-900 flex items-center justify-between'>
              <span>Skills</span>
              <span className='text-xs text-slate-500'>Model · {selected.model}</span>
            </div>
            <div className='mt-3 flex flex-wrap gap-2 text-[12px] text-slate-800'>
              {primarySkills.map(skill => (
                <span
                  key={skill}
                  className='rounded-md border border-slate-200 bg-white px-3 py-1 font-semibold tracking-tight'
                >
                  {skill}
                </span>
              ))}
              {remaining > 0 && (
                <span className='rounded-md border border-slate-200 bg-white px-3 py-1 font-semibold tracking-tight text-slate-500'>
                  +{remaining} more
                </span>
              )}
            </div>
            {showAllSkills ? (
              <div className='mt-3 text-[12px] leading-6 text-slate-700'>{skillLine}</div>
            ) : null}
            <button
              type='button'
              className='mt-3 text-xs font-semibold text-slate-600 underline decoration-slate-400 decoration-dotted'
              onClick={() => setShowAllSkills(v => !v)}
            >
              {showAllSkills ? 'Hide full list' : `View all ${selected.skills.length} skills`}
            </button>
          </div>

          <form className='mt-4 space-y-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-xs uppercase tracking-wide text-slate-500'>API base URL</label>
              <input
                value={apiBase}
                onChange={e => setApiBase(e.target.value)}
                placeholder='https://api.your-stack.com'
                className='input'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs uppercase tracking-wide text-slate-500'>API key</label>
              <input
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder='••••••••'
                className='input'
                type='password'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs uppercase tracking-wide text-slate-500'>Model</label>
              <input
                value={model}
                onChange={e => setModel(e.target.value)}
                placeholder='gpt-4.1'
                className='input'
              />
            </div>
            <button type='button' className='pill solid w-full justify-center text-center' onClick={handleDeploy}>
              Deploy this agent
            </button>
          </form>
        </section>
      </main>

      {showToast ? (
        <div className='fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-soft'>
          {selected.name} deployed (demo)
        </div>
      ) : null}
    </div>
  )
}
