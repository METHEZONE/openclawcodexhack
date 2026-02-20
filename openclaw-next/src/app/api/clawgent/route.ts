import { NextResponse } from 'next/server'

const TARGET = 'https://clawgent.ai/i/1696942f8044e9675e45c326/agents'

export async function GET() {
  try {
    const res = await fetch(TARGET, {
      // Avoid caching; this is just for a demo pulse
      cache: 'no-store'
    })

    if (!res.ok) {
      return NextResponse.json({ ok: false, items: [], error: `Fetch failed (${res.status})` }, { status: 502 })
    }

    const html = await res.text()
    const names = Array.from(html.matchAll(/"name"\s*:\s*"([^"]{3,64})"/gi)).map(m => m[1])
    const headings = Array.from(html.matchAll(/<h\d[^>]*>([^<]{3,80})<\/h\d>/gi)).map(m => m[1].trim())
    const combined = [...names, ...headings]
      .map(t => t.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 8)

    return NextResponse.json({ ok: true, items: combined, source: 'clawgent', url: TARGET })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, items: [], error: msg }, { status: 500 })
  }
}
