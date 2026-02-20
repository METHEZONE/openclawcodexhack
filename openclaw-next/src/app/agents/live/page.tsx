'use client'

import { useEffect, useState } from 'react'

const working = [
  {
    name: 'Amber Scout',
    color: '#f7b500',
    jobs: [
      { title: 'ab-test-setup', status: 'running' },
      { title: 'lead-hunt: fintech ICP', status: 'queued' },
      { title: 'offer-grid refresh', status: 'done' }
    ]
  },
  {
    name: 'Rose Writer',
    color: '#ff4f84',
    jobs: [
      { title: 'persona-weave draft', status: 'running' },
      { title: 'subject-variants x6', status: 'queued' },
      { title: 'tone-shift review', status: 'done' }
    ]
  },
  {
    name: 'Cyan Surfer',
    color: '#54d6ff',
    jobs: [
      { title: 'scrape + summarize (docs)', status: 'running' },
      { title: 'cite block build', status: 'queued' },
      { title: 'quote-extract cleanup', status: 'done' }
    ]
  }
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
            <div className='mt-3 text-sm text-slate-700'>
              Current job: {agent.jobs[tick % agent.jobs.length].title}
            </div>
            <div className='mt-2 space-y-1'>
              {agent.jobs.map(job => (
                <div key={job.title} className='flex items-center justify-between text-xs text-slate-600'>
                  <span>{job.title}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-semibold capitalize ${
                      job.status === 'running'
                        ? 'bg-emerald-100 text-emerald-700'
                        : job.status === 'queued'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
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
