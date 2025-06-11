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
        <div className="mb-8">
          <Image
            src="/images/wSharkMain.svg"
            alt="Whale Shark Solutions Logo"
            width={400}
            height={400}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-2xl font-normal mb-8">
          Sign up to learn more
        </h1>
        <EmailForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
