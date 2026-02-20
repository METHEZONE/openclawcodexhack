'use client'

import { useEffect, useState } from 'react'

type HistoryItem = {
  agent: string
  event: string
  status: 'running' | 'queued' | 'done'
  at?: string
}

type ChatItem = {
  from: string
  text: string
  at?: string
}

type ChatMessage = {
  role: 'user' | 'agent'
  text: string
  from: string
  at: string
}

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

const historySeeds: HistoryItem[] = [
  { agent: 'Amber Scout', event: 'Synced 42 leads to CRM', status: 'done' },
  { agent: 'Rose Writer', event: 'Published outreach v2', status: 'done' },
  { agent: 'Cyan Surfer', event: 'Pinned 6 citations', status: 'done' },
  { agent: 'Amber Scout', event: 'Queued ICP refresh', status: 'queued' },
  { agent: 'Rose Writer', event: 'Tone-checking drafts', status: 'running' }
]

const chatSeeds: ChatItem[] = [
  { from: 'Amber Scout', text: 'Passing fresh ICP shortlist your way.' },
  { from: 'Rose Writer', text: 'Got it—will weave personas into copy.' },
  { from: 'Cyan Surfer', text: 'Link bundle ready if you need citations.' }
]

export default function LiveAgents() {
  const [tick, setTick] = useState(0)
  const [history, setHistory] = useState<HistoryItem[]>(historySeeds)
  const [chat, setChat] = useState<ChatItem[]>(chatSeeds)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [chatAgent, setChatAgent] = useState(working[0].name)
  const [chatBusy, setChatBusy] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const next = historySeeds[(history.length + Math.floor(Math.random() * historySeeds.length)) % historySeeds.length]
      const stamped = {
        ...next,
        at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setHistory(h => [stamped, ...h].slice(0, 10))
      const chatNext = chatSeeds[(chat.length + Math.floor(Math.random() * chatSeeds.length)) % chatSeeds.length]
      setChat(c => [
        { ...chatNext, at: stamped.at },
        ...c
      ].slice(0, 12))
    }, 3600)
    return () => clearInterval(id)
  }, [history.length, chat.length])

  const sendChat = async () => {
    const trimmed = input.trim()
    if (!trimmed) return
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: ChatMessage = { role: 'user', text: trimmed, from: 'You', at: stamp }
    setMessages(m => [...m, userMsg])
    setInput('')
    setChatBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent: chatAgent, message: trimmed })
      })
      const data = await res.json()
      const replyText = data?.reply || 'No reply'
      const reply: ChatMessage = { role: 'agent', text: replyText, from: chatAgent, at: stamp }
      setMessages(m => [...m, reply])
    } catch (e) {
      const fail: ChatMessage = {
        role: 'agent',
        text: 'Failed to reach chat API (demo continues).',
        from: chatAgent,
        at: stamp
      }
      setMessages(m => [...m, fail])
    } finally {
      setChatBusy(false)
    }
  }

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

      <section className='relative z-10 mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]'>
        <div className='rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-soft backdrop-blur'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs uppercase tracking-wide text-slate-500'>Recent jobs</p>
              <h2 className='text-lg font-semibold text-slate-900'>History</h2>
            </div>
            <span className='pill outline text-xs'>Auto-refreshed</span>
          </div>
          <div className='mt-3 space-y-2 text-sm text-slate-700'>
            {history.map((item, i) => (
              <div
                key={`${item.agent}-${item.event}-${i}`}
                className='flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-3 py-2'
              >
                <div>
                  <div className='text-xs uppercase tracking-wide text-slate-500'>{item.agent}</div>
                  <div className='font-semibold text-slate-900'>{item.event}</div>
                  {item.at ? <div className='text-[11px] text-slate-500'>{item.at}</div> : null}
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                    item.status === 'running'
                      ? 'bg-emerald-100 text-emerald-700'
                      : item.status === 'queued'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-soft backdrop-blur'>
          <p className='text-xs uppercase tracking-wide text-slate-500'>Agent chatter</p>
          <h2 className='text-lg font-semibold text-slate-900'>They talk to each other</h2>
          <div className='mt-3 space-y-2 text-sm text-slate-700'>
            {chat.map((msg, i) => (
              <div
                key={`${msg.from}-${i}`}
                className='rounded-2xl border border-slate-200 bg-white/80 px-3 py-2'
              >
                <div className='flex items-center justify-between'>
                  <span className='font-semibold text-slate-900'>{msg.from}</span>
                  {msg.at ? <span className='text-[11px] text-slate-500'>{msg.at}</span> : null}
                </div>
                <div className='text-slate-700'>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className='mt-4 border-t border-slate-200 pt-3'>
            <div className='mb-2 flex items-center justify-between'>
              <label className='text-xs font-semibold text-slate-600'>Talk to an agent</label>
              <select
                value={chatAgent}
                onChange={e => setChatAgent(e.target.value)}
                className='rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700'
              >
                {working.map(a => (
                  <option key={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-800'>
                {messages.length === 0 ? (
                  <div className='text-xs text-slate-500'>Say hi—demo will reply even without an API key.</div>
                ) : (
                  messages.map((m, i) => (
                    <div key={i} className='mb-2'>
                      <div className='flex items-center justify-between text-[11px] text-slate-500'>
                        <span>{m.from}</span>
                        <span>{m.at}</span>
                      </div>
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          m.role === 'user' ? 'bg-white' : 'bg-emerald-50'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className='flex gap-2'>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder='Ask this orb anything...'
                  className='flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-slate-400'
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      sendChat()
                    }
                  }}
                />
                <button
                  type='button'
                  className='pill solid px-4 text-sm'
                  onClick={sendChat}
                  disabled={chatBusy}
                >
                  {chatBusy ? 'Talking…' : 'Send'}
                </button>
              </div>
              <p className='text-[11px] text-slate-500'>
                Uses OpenAI if `OPENAI_API_KEY` is set; otherwise replies in demo mode.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
