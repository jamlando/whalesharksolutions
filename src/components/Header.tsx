import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Whale Shark v2.svg"
            alt="Whale Shark Solutions Logo"
            width={180}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  )
} 