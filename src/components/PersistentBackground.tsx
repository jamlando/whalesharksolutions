'use client'

import React from 'react'
import Image from 'next/image'

export default function PersistentBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Image
        src="/images/backgrounds/jeremiah-del-mar-0lgdsiAdg3k-unsplash.jpg"
        alt="Ocean Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay for better content readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  )
} 