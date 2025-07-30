'use client'

import React from 'react'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/jeremiah-del-mar-0lgdsiAdg3k-unsplash.jpg"
          alt="Ocean Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay for better logo readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Logo Overlay */}
      <div className="relative z-20 h-full flex items-center justify-center pb-20">
        <Image
          src="/images/wSharkWhiteTransparentv1.svg"
          alt="Whale Shark Solutions Logo"
          width={400}
          height={400}
          className="w-80 md:w-96 lg:w-[28rem] xl:w-[32rem]"
          priority
        />
      </div>
    </div>
  )
} 