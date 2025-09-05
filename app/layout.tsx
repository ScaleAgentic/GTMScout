import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ScaleAgentic - Scout',
  description: 'Your Agentic GTM Team',
  generator: 'ScaleAgentic',
  icons: {
    icon: '/ScaleAgentic Mark.png', // favicon in public folder
  },
  openGraph: {
    title: 'ScaleAgentic - Scout',
    description: 'Your Agentic GTM Team',
    url: 'https://join.scaleagentic.ai',
    siteName: 'ScaleAgentic',
    images: [
      {
        url: '/socialpreview.png', // OG image in public folder
        width: 1200,
        height: 630,
        alt: 'ScaleAgentic Social Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScaleAgentic - Scout',
    description: 'Your Agentic GTM Team',
    images: ['/socialpreview.png'], // same as OG image
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
