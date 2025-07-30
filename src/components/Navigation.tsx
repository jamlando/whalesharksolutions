'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center p-2 rounded-md hover:bg-white/5 transition-all duration-200">
              <Image
                src="/images/wSharkWhiteTransparentv1.svg"
                alt="Whale Shark Solutions"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Get Started Button */}
          <div className="flex-shrink-0">
            <Link
              href="/signup"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white/40 hover:text-white/80 hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 