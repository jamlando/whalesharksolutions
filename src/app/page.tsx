'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import PersistentBackground from '@/components/PersistentBackground'
import AnimatedHero from '@/components/AnimatedHero'
import AnimatedTagline from '@/components/AnimatedTagline'
import AnimatedServicesSection from '@/components/AnimatedServicesSection'
import EmailSignupSection from '@/components/EmailSignupSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <PersistentBackground />
      <Navigation />
      <div className="relative">
        <AnimatedHero />
      </div>
      <AnimatedServicesSection />
      <EmailSignupSection />
      <Footer />
    </>
  )
}
