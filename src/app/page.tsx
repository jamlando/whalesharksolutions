'use client'

import React from 'react'
import Image from 'next/image'
import EmailForm from '@/components/EmailForm'

export default function Home() {
  const handleSubmit = async (email: string) => {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Failed to subscribe')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="content-container max-w-2xl w-full text-center">
        <div className="mb-16">
          <Image
            src="/images/wSharkWhiteTransparentv1.svg"
            alt="Whale Shark Solutions Logo"
            width={600}
            height={600}
            className="mx-auto"
            priority
          />
        </div>
        <div className="w-full max-w-[400px] mx-auto mb-4">
          <svg viewBox="0 0 400 20" className="w-full h-auto text-gray-200">
            <path
              d="M0 10 C 60 0, 140 20, 200 10 C 260 0, 340 20, 400 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M0 15 C 60 5, 140 25, 200 15 C 260 5, 340 25, 400 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-normal mb-8 text-gray-400">
          Sign up to learn more
        </h1>
        <EmailForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
