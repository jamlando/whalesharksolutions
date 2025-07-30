import React from 'react'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Whale Shark Solutions',
  description: 'Streamlining workflows and boosting team productivity through expert tool implementation, automation, and comprehensive training programs.',
  openGraph: {
    title: 'Whale Shark Solutions',
    description: 'Streamlining workflows and boosting team productivity through expert tool implementation, automation, and comprehensive training programs.',
    url: 'https://whalesharksolutions.com',
    siteName: 'Whale Shark Solutions',
    images: [
      {
        url: '/images/wsMainDark.png',
        width: 1200,
        height: 630,
        alt: 'Whale Shark Solutions Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whale Shark Solutions',
    description: 'Streamlining workflows and boosting team productivity through expert tool implementation, automation, and comprehensive training programs.',
    images: ['/images/wsMainDark.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-montserrat`}>
        {children}
      </body>
    </html>
  )
}
