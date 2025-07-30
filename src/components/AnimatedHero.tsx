'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Logo animation - shrinks and moves to center to attach to services
  const logoY = useTransform(scrollYProgress, [0, 0.6], [0, -100])
  const logoX = useTransform(scrollYProgress, [0, 0.6], [0, 0])
  const logoScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.2])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Animated Logo */}
            <motion.div 
        className="relative z-20 h-full flex items-center justify-center pb-20" 
        style={{ 
          y: logoY, 
          x: logoX,
          scale: logoScale, 
          opacity: logoOpacity 
        }}
      >
        <Image
          src="/images/wSharkWhiteTransparentv1.svg"
          alt="Whale Shark Solutions Logo"
          width={500}
          height={500}
          className="w-[25rem] md:w-[30rem] lg:w-[35rem] xl:w-[40rem]"
          priority
        />
      </motion.div>
    </div>
  )
} 