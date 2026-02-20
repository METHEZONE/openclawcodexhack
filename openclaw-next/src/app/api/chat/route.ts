import { NextResponse } from 'next/server'

type ChatBody = {
  agent: string
  message: string
}

export async function POST(req: Request) {
  let body: ChatBody | null = null

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const agent = body?.agent || 'agent'
  const message = body?.message || ''

  if (!message.trim()) {
    return NextResponse.json({ ok: false, error: 'Message is required' }, { status: 400 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      mode: 'mock',
      reply: `(${agent} demo) I heard you: "${message}". In demo mode I riff back without hitting OpenAI.`,
      agent
    })
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        temperature: 0.4,
        max_tokens: 150,
        messages: [
          {
            role: 'system',
            content: `You are ${agent}, a friendly mycelia orb agent. Answer briefly and in a calm, encouraging tone.`
          },
          { role: 'user', content: message }
        ]
      })
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { ok: false, mode: 'real', error: `Upstream failed: ${text.slice(0, 200)}` },
        { status: 502 }
      )
    }

    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content || 'No reply text'

    return NextResponse.json({ ok: true, mode: 'real', reply, agent })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, mode: 'real', error: msg }, { status: 500 })
  }
}
