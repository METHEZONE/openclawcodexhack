'use client'

import Link from 'next/link'

type Palette = {
  name: string
  c1: string
  c2: string
  c3: string
  c4: string
  c5: string
}

// Palette sampled to match the comet / mycelia video vibe (teal + ember)
const palette: Palette = {
  name: 'Comet Ember',
  c1: '#f6ede3',
  c2: '#d4c4b5',
  c3: '#4a829d',
  c4: '#e06b2e',
  c5: '#1b2b3c'
}

export default function Home() {
  return (
    <div className='relative min-h-screen overflow-hidden surface-light'>
      <div className='bg-orb orb-left' />
      <div className='bg-orb orb-right' />
      <div className='bg-orb orb-top' />
      <header className='relative z-10 flex items-center justify-between px-6 py-6 md:px-10'>
        <div className='flex items-center gap-2 text-lg font-semibold text-slate-800'>
          <span className='h-8 w-8 rounded-full bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 shadow-lg' />
          Mycelia
        </div>
        <div className='flex gap-3 text-sm'>
          <button className='pill ghost'>Product tour</button>
          <button className='pill solid'>Download</button>
        </div>
      </header>

      <main className='relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center gap-8 px-6 pb-16 text-center md:pb-24'>
        <div className='text-xs uppercase tracking-wide text-slate-500'>A calm portal for living orbs</div>
        <h1 className='text-4xl font-semibold leading-tight text-slate-900 md:text-5xl'>
          The stage where agents feel alive.
        </h1>
        <p className='max-w-2xl text-base text-slate-600'>
          Tap once to watch a soul generate. Nothing else to learn—just motion and a single button to enter.
        </p>

        <div className='relative mt-2 flex flex-col items-center gap-4'>
          <div className='hole'>
            {Array.from({ length: 10 }).map((_, idx) => (
              <i
                key={idx}
                style={
                  {
                    background: `radial-gradient(circle, ${palette.c2}55, transparent 70%)`,
                    boxShadow: '0 0 50px rgba(255,255,255,0.35)'
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className='loader-wrapper'>
            <div
              className='loader'
              style={
                {
                  '--c1': palette.c1,
                  '--c2': palette.c2,
                  '--c3': palette.c3,
                  '--c4': palette.c4,
                  '--c5': palette.c5
                } as React.CSSProperties
              }
            />
            {'generating'.split('').map((l, i) => (
              <span key={i} className='loader-letter'>
                {l}
              </span>
            ))}
          </div>
          <div className='text-xs text-slate-500'>Palette: {palette.name}</div>
        </div>

        <div className='flex flex-wrap justify-center gap-3'>
          <Link href='/agents' className='pill solid'>
            Enter Mycelia
          </Link>
        </div>
      </main>
    </div>
  )
}
