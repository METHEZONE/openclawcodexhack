import type { Metadata } from 'next'
import { Chakra_Petch, Press_Start_2P } from 'next/font/google'
import './globals.css'

const sans = Chakra_Petch({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const arcade = Press_Start_2P({
  variable: '--font-arcade',
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'OpenClaw Arcade',
  description: 'Mac-friendly, game-like agent launcher built for Hack Night'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${sans.variable} ${arcade.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
