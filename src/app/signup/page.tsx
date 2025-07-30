'use client'

import React from 'react'
import Image from 'next/image'
import EmailForm from '@/components/EmailForm'
import Navigation from '@/components/Navigation'
import PersistentBackground from '@/components/PersistentBackground'

export default function SignupPage() {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  const handleSubmit = async (email: string) => {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Handle different error scenarios
      if (response.status === 409) {
        // User already subscribed - show success message
        setSuccessMessage('You have already signed up! We\'ll be in touch soon.')
        return
      } else {
        throw new Error(data.error || 'Failed to subscribe')
      }
    }

    // Set the success message based on whether it's a new or existing user
    setSuccessMessage(data.message)
  }

  return (
    <>
      <PersistentBackground />
      <Navigation />
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        {/* Ocean Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/ocean-bg.jpg"
            alt="Ocean Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 content-container max-w-2xl w-full text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <div className="mb-8">
              <Image
                src="/images/wSharkWhiteTransparentv1.svg"
                alt="Whale Shark Solutions Logo"
                width={300}
                height={300}
                className="mx-auto"
                priority
              />
            </div>

            <div className="w-full max-w-[400px] mx-auto mb-6">
              <svg viewBox="0 0 400 20" className="w-full h-auto text-white">
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

            <h1 className="text-3xl font-normal mb-6 text-white">
              Sign up to learn more
            </h1>

            <p className="text-lg text-white/90 mb-8 max-w-md mx-auto">
              Join our community and discover how Whale Shark Solutions can transform your business with our gentle approach to software development.
            </p>

            <EmailForm onSubmit={handleSubmit} successMessage={successMessage} />
          </div>
        </div>
      </main>
    </>
  )
} 