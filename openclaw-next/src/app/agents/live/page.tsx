'use client'

import { useEffect, useState } from 'react'

const working = [
  { name: 'Amber Scout', status: 'Scraping ICP signals', color: '#f7b500' },
  { name: 'Rose Writer', status: 'Drafting outreach v2', color: '#ff4f84' },
  { name: 'Cyan Surfer', status: 'Summarizing docs', color: '#54d6ff' }
]

export default function LiveAgents() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className='relative min-h-screen overflow-hidden surface-light px-6 pb-16 md:px-10'>
      <div className='bg-orb orb-left' />
      <div className='bg-orb orb-right' />
      <header className='relative z-10 flex items-center justify-between py-6'>
        <h1 className='text-2xl font-semibold text-slate-900'>Agents at work</h1>
        <div className='pill ghost text-xs'>Demo view</div>
      </header>

      <main className='relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {working.map((agent, idx) => (
          <div
            key={agent.name}
            className='rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-soft backdrop-blur'
          >
            <div className='flex items-center gap-3'>
              <span
                className='inline-block h-10 w-10 rounded-full shadow-soft'
                style={{ background: agent.color }}
              />
              <div>
                <p className='text-sm uppercase tracking-wide text-slate-500'>Agent</p>
                <p className='text-base font-semibold text-slate-900'>{agent.name}</p>
              </div>
            </div>
            <div className='mt-3 text-sm text-slate-700'>{agent.status}</div>
            <div className='mt-3 flex items-center gap-2 text-xs text-slate-500'>
              <span className='h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]' />
              Live · tick {tick + idx}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
