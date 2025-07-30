'use client'

import React from 'react'
import Image from 'next/image'

export default function TaglineSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-whale-secondary-dark to-whale-secondary-deep">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6">
          <Image 
            src="/images/wSharkWhiteTransparentv1.svg" 
            alt="Whale Shark Solutions Logo" 
            width={120} 
            height={120} 
            className="w-24 h-24 mx-auto"
            priority 
          />
        </div>
        <h2 className="text-6xl md:text-8xl lg:text-10xl font-light text-white mb-4">
          Gentle Giants of Software Solutions
        </h2>
        <div className="w-24 h-1 bg-whale-primary mx-auto mt-8"></div>
      </div>
    </section>
  )
} 