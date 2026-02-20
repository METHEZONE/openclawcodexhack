import { NextResponse } from 'next/server'

type DeployBody = {
  agentId: string
  skills?: string[]
  apiBase?: string
  apiKey?: string
  model?: string
}

export async function POST(req: Request) {
  let body: DeployBody | null = null

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const agentId = body?.agentId || 'unknown-agent'
  const skills = body?.skills || []
  const apiBase = body?.apiBase?.trim() || ''
  const apiKey = body?.apiKey?.trim() || ''
  const model = body?.model || ''

  const payload = { agentId, skills, model }
  const shouldMock = !apiBase || !/^https?:\/\//i.test(apiBase)

  if (shouldMock) {
    return NextResponse.json({ ok: true, mode: 'mock', message: 'Mock deploy succeeded', payload })
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`
    headers['x-api-key'] = apiKey
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(apiBase, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    })

    const text = await res.text()
    const ok = res.ok

    return NextResponse.json(
      {
        ok,
        mode: 'real',
        status: res.status,
        body: text?.slice(0, 400) || 'No response body',
        payload
      },
      { status: ok ? 200 : 502 }
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, mode: 'real', error: message, payload }, { status: 500 })
  } finally {
    clearTimeout(timeout)
  }
}
