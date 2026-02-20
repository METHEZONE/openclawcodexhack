'use client'

import { useEffect, useMemo, useState } from 'react'

type Agent = {
  id: string
  name: string
  role: string
  model: string
  color: string
  accent: string
  skills: string[]
  aura: string
  avatar: string
}

const agents: Agent[] = [
  {
    id: 'marketing-pro',
    name: 'Marketing Pro',
    role: 'Campaigns with claws',
    model: 'claude-3.5',
    color: '#ff9f43',
    accent: '#ffde8a',
    skills: ['persona-forge', 'offer-lab', 'landing-tune', 'sequences'],
    aura: 'from-orange-400/30 via-amber-400/10 to-purple-500/20',
    avatar: '🦞'
  },
  {
    id: 'sales-assistant',
    name: 'Sales Assistant',
    role: 'Objection-killing follow-ups',
    model: 'gpt-4.3',
    color: '#ff6388',
    accent: '#ffc0d9',
    skills: ['call-notes', 'next-steps', 'contract-draft', 'crm-update'],
    aura: 'from-pink-500/30 via-rose-400/10 to-amber-400/20',
    avatar: '🦐'
  },
  {
    id: 'lead-gen',
    name: 'Lead Gen Machine',
    role: 'Turns the internet into a pipeline',
    model: 'gemini-2.0',
    color: '#f7b500',
    accent: '#ffe28a',
    skills: ['lead-hunter', 'web-scraper', 'icp-builder', 'landing-builder'],
    aura: 'from-amber-400/40 via-yellow-300/10 to-cyan-400/25',
    avatar: '🦀'
  },
  {
    id: 'dev-copilot',
    name: 'Dev Copilot',
    role: 'Reads logs, ships fixes',
    model: 'gpt-4o-mini',
    color: '#6ce0ff',
    accent: '#c8f1ff',
    skills: ['trace-read', 'patch-draft', 'pr-commentary', 'tests'],
    aura: 'from-cyan-400/40 via-sky-300/15 to-indigo-400/25',
    avatar: '🦐'
  },
  {
    id: 'support',
    name: 'Support Agent',
    role: 'Zero-lag resolutions',
    model: 'claude-3-opus',
    color: '#8bd17c',
    accent: '#d6f4ca',
    skills: ['macro-kit', 'tone-shift', 'kb-scan', 'refund-guardrails'],
    aura: 'from-lime-400/35 via-emerald-300/10 to-cyan-300/25',
    avatar: '🦞'
  },
  {
    id: 'ops',
    name: 'Ops Automator',
    role: 'Runs playbooks without humans',
    model: 'gpt-4.1',
    color: '#c082ff',
    accent: '#e6d4ff',
    skills: ['scheduler', 'inventory-watch', 'escalate', 'qa-proof'],
    aura: 'from-purple-400/35 via-violet-300/10 to-indigo-400/25',
    avatar: '🦐'
  }
]

const stagedPrompts = [
  'Scouting ICP targets...',
  'Running Jam MCP guidance...',
  'Scraping fresh intent signals...',
  'Drafting outreach with human tone...',
  'Pushing A2UI canvas to the stage...',
  'Handoff to CRM via OpenClaw pipes...'
]

const chatSeed = [
  { from: 'Lead Gen Machine', text: 'Pulling 42 fresh leads with hiring intent.' },
  { from: 'You', text: 'Show me the cleanest 5.' },
  { from: 'Lead Gen Machine', text: 'Pinning 5 to the Stage and teeing up ICP builder.' }
]

export default function Home() {
  const [selected, setSelected] = useState<Agent>(agents[2])
  const [isDeploying, setIsDeploying] = useState(false)
  const [actionLog, setActionLog] = useState<string[]>([
    'Stage warmed with Jam MCP hints',
    'Wan ad slot reserved',
    'Agents idling'
  ])
  const [chat, setChat] = useState(chatSeed)

  const headline = useMemo(
    () => (isDeploying ? 'DEPLOYING...' : 'CHOOSE YOUR AGENT'),
    [isDeploying]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDeploying) return
      const next = stagedPrompts[Math.floor(Math.random() * stagedPrompts.length)]
      setActionLog(prev => [next, ...prev].slice(0, 6))
    }, 2600)
    return () => clearInterval(interval)
  }, [isDeploying])

  const deployAgent = () => {
    setIsDeploying(true)
    setActionLog(prev => [`Deploying ${selected.name}...`, ...prev].slice(0, 6))
    setTimeout(() => {
      setIsDeploying(false)
      setActionLog(prev => [`${selected.name} is live on the stage`, ...prev].slice(0, 6))
      setChat(current => [
        { from: selected.name, text: 'Live. Opening camera feed + A2UI JSONL.' },
        ...current
      ])
    }, 4000)
  }

  const addJamHint = () => {
    setChat(current => [
      { from: 'Jam MCP', text: 'Next move: auto-summarize intent then auto-craft outreach draft.' },
      ...current
    ])
  }

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div className='grid-overlay' />
      <main className='relative mx-auto max-w-7xl px-6 py-10'>
        <header className='mb-8 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <p className='title-pixel text-sm text-[var(--accent-2)]'>OpenClaw Arcade</p>
            <h1 className='mt-2 text-3xl font-semibold text-white md:text-4xl'>
              Non-coders launch agents like picking characters in a game
            </h1>
            <p className='mt-3 max-w-2xl text-sm text-slate-300'>
              Inspired by Clawgent: arcade grid on top of OpenClaw, Jam MCP for guided moves, Wan ad slot ready for the demo reel.
            </p>
          </div>
          <div className='flex flex-wrap gap-2 text-xs uppercase'>
            <span className='rounded-full bg-[var(--card)] px-4 py-2 text-[var(--accent-2)] neon-border'>
              Jam MCP Guided
            </span>
            <span className='rounded-full bg-[var(--card)] px-4 py-2 text-[var(--accent)] neon-border'>
              Wan Ad Ready
            </span>
            <span className='rounded-full bg-[var(--card)] px-4 py-2 text-[var(--accent-3)] neon-border'>
              OpenClaw Live
            </span>
          </div>
        </header>

        <section className='grid gap-6 lg:grid-cols-[1.35fr_1fr]'>
          <div className='rounded-3xl bg-[var(--panel)] p-5 neon-border'>
            <div className='mb-4 flex items-center justify-between'>
              <div>
                <p className='title-pixel text-xs text-[var(--accent)]'>{headline}</p>
                <p className='text-sm text-slate-300'>Pick a template. Hit deploy. Watch it work.</p>
              </div>
              <span className='rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200'>
                {agents.length} agents
              </span>
            </div>
            <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
              {agents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setSelected(agent)}
                  className={`relative overflow-hidden rounded-2xl bg-[var(--card)] p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                    selected.id === agent.id ? 'ring-2 ring-[var(--accent-2)]' : 'ring-1 ring-white/5'
                  }`}
                  style={{ boxShadow: selected.id === agent.id ? '0 0 25px rgba(84,214,255,0.25)' : 'none' }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${agent.aura}`} />
                  <div className='relative flex items-start justify-between gap-3'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-black/50 text-2xl'>
                      {agent.avatar}
                    </div>
                    <div className='text-right text-xs text-slate-300'>
                      <p>Model</p>
                      <p className='font-semibold text-white'>{agent.model}</p>
                    </div>
                  </div>
                  <h3 className='relative mt-4 text-lg font-semibold text-white'>{agent.name}</h3>
                  <p className='relative mt-1 text-sm text-slate-200'>{agent.role}</p>
                  <div className='relative mt-3 flex flex-wrap gap-2 text-[11px]'>
                    {agent.skills.slice(0, 3).map(skill => (
                      <span
                        key={skill}
                        className='rounded-full bg-black/50 px-3 py-1 text-slate-100'
                        style={{ border: `1px solid ${agent.accent}` }}
                      >
                        {skill}
                      </span>
                    ))}
                    {agent.skills.length > 3 && (
                      <span className='rounded-full bg-white/10 px-3 py-1 text-slate-200'>
                        +{agent.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='rounded-3xl bg-[var(--panel)] p-5 neon-border'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <p className='title-pixel text-xs text-[var(--accent-2)]'>AGENT CARD</p>
                  <h2 className='mt-2 text-2xl font-semibold text-white'>{selected.name}</h2>
                  <p className='text-sm text-slate-300'>{selected.role}</p>
                </div>
                <div className='rounded-xl bg-black/40 px-3 py-2 text-right text-xs text-slate-200'>
                  <p>Model</p>
                  <p className='font-semibold text-white'>{selected.model}</p>
                </div>
              </div>
              <div className='mt-4 grid grid-cols-2 gap-3 text-xs text-slate-200'>
                <div className='rounded-xl bg-white/5 p-3'>
                  <p className='text-slate-400'>Skills</p>
                  <p className='mt-1 font-semibold text-white'>{selected.skills.length} loaded</p>
                </div>
                <div className='rounded-xl bg-white/5 p-3'>
                  <p className='text-slate-400'>Latency target</p>
                  <p className='mt-1 font-semibold text-white'>under 3.5s</p>
                </div>
                <div className='rounded-xl bg-white/5 p-3'>
                  <p className='text-slate-400'>Stage slot</p>
                  <p className='mt-1 font-semibold text-white'>Front row</p>
                </div>
                <div className='rounded-xl bg-white/5 p-3'>
                  <p className='text-slate-400'>CRM bridge</p>
                  <p className='mt-1 font-semibold text-white'>OpenClaw → A2UI</p>
                </div>
              </div>
              <div className='mt-5 flex flex-wrap gap-3'>
                <button
                  onClick={deployAgent}
                  className='rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(247,181,0,0.35)]'
                >
                  {isDeploying ? 'Deploying...' : 'Deploy with this agent'}
                </button>
                <button
                  onClick={addJamHint}
                  className='rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(84,214,255,0.25)]'
                >
                  Ask Jam for guidance
                </button>
                <button className='rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(158,242,124,0.25)]'>
                  Play Wan video ad
                </button>
              </div>
            </div>

            <div className='rounded-3xl bg-[var(--panel)] p-5 neon-border'>
              <div className='mb-3 flex items-center justify-between'>
                <p className='title-pixel text-xs text-[var(--accent-3)]'>WAN AD SLOT</p>
                <span className='rounded-full bg-white/10 px-2 py-1 text-[11px] text-slate-200'>
                  12s demo reel
                </span>
              </div>
              <div className='aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-700/40 via-slate-900 to-cyan-700/30'>
                <div className='flex h-full w-full items-center justify-center text-center'>
                  <p className='max-w-sm text-sm text-slate-200'>
                    Drop the Wan-generated video here. In the demo, this plays after deploy to mimic arcade
                    attract mode.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
          <div className='rounded-3xl bg-[var(--panel)] p-5 neon-border'>
            <div className='mb-3 flex items-center justify-between'>
              <p className='title-pixel text-xs text-[var(--accent-2)]'>STAGE FEED</p>
              <span className='rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200'>
                {isDeploying ? 'Spooling up...' : 'Live'}
              </span>
            </div>
            <div className='grid gap-4 lg:grid-cols-2'>
              <div className='space-y-2 rounded-2xl border border-white/10 bg-[var(--card)] p-4'>
                <p className='text-sm text-slate-300'>Action log</p>
                <ul className='space-y-2 text-sm text-white'>
                  {actionLog.map((entry, idx) => (
                    <li key={`${entry}-${idx}`} className='flex items-center gap-2'>
                      <span className='h-2 w-2 rounded-full bg-[var(--accent-2)] shadow-[0_0_8px_rgba(84,214,255,0.8)]' />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='space-y-2 rounded-2xl border border-white/10 bg-[var(--card)] p-4'>
                <p className='text-sm text-slate-300'>Chat</p>
                <div className='space-y-2 text-sm'>
                  {chat.slice(0, 5).map((line, idx) => (
                    <div
                      key={`${line.from}-${idx}`}
                      className={`rounded-xl px-3 py-2 ${
                        line.from === 'You' ? 'bg-white/10 text-white' : 'bg-black/30 text-slate-100'
                      }`}
                    >
                      <p className='text-[11px] uppercase tracking-wide text-slate-300'>{line.from}</p>
                      <p className='text-sm'>{line.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-3xl bg-[var(--panel)] p-5 neon-border'>
            <p className='title-pixel text-xs text-[var(--accent)]'>JAM MCP SCRIPT</p>
            <div className='mt-3 space-y-3 text-sm text-slate-200'>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-3'>
                <p className='text-[11px] uppercase tracking-wide text-[var(--accent-2)]'>Suggested steps</p>
                <ol className='mt-2 space-y-1 pl-4 marker:text-[var(--accent-2)]'>
                  <li className='list-decimal'>Ingest latest intent scrape into context graph</li>
                  <li className='list-decimal'>Generate A2UI JSONL + inline CTA buttons</li>
                  <li className='list-decimal'>Stage Wan ad playback once CTA is clicked</li>
                </ol>
              </div>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-3'>
                <p className='text-[11px] uppercase tracking-wide text-[var(--accent-3)]'>System prompt</p>
                <p className='mt-2 text-sm text-slate-100'>
                  You are the arcade director. Every action must look game-like: short bursts, visible progress,
                  celebratory flashes when a task completes.
                </p>
              </div>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-3'>
                <p className='text-[11px] uppercase tracking-wide text-[var(--accent-2)]'>Outputs</p>
                <p className='mt-2 text-sm text-slate-100'>
                  - A2UI blocks for the Stage panel
                  <br />- Deployment command summary (OpenClaw pipeline)
                  <br />- CTA to play Wan ad clip
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
