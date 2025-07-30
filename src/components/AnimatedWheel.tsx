'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AnimatedWheel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Wheel rotation animation
  const wheelRotation = useTransform(scrollYProgress, [0, 1], [0, 360])
  
  // Logo animations (center hub)
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Quote animations (inner ring)
  const quoteOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const quoteScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1])
  const quoteExitOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0])
  const quoteExitScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.5])

  // Services animations (outer ring)
  const servicesOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1])
  const servicesScale = useTransform(scrollYProgress, [0.4, 0.7], [0.8, 1])
  const servicesExitOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0])
  const servicesExitScale = useTransform(scrollYProgress, [0.8, 1], [1, 0.3])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/jeremiah-del-mar-0lgdsiAdg3k-unsplash.jpg"
          alt="Ocean Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Wheel Container */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <motion.div 
          className="relative w-96 h-96"
          style={{ rotate: wheelRotation }}
        >
          {/* Center Logo Hub */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ scale: logoScale, opacity: logoOpacity }}
          >
            <Image 
              src="/images/wSharkWhiteTransparentv1.svg" 
              alt="Whale Shark Solutions Logo" 
              width={200} 
              height={200} 
              className="w-48 h-48"
              priority 
            />
          </motion.div>

          {/* Inner Ring - Quote */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              opacity: scrollYProgress.get() > 0.7 ? quoteExitOpacity : quoteOpacity,
              scale: scrollYProgress.get() > 0.7 ? quoteExitScale : quoteScale
            }}
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-6 w-80 h-80 flex items-center justify-center">
              <h2 className="text-2xl font-extralight text-white text-center leading-tight">
                "Gentle Giants of Software Solutions"
              </h2>
            </div>
          </motion.div>

          {/* Outer Ring - Services */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              opacity: scrollYProgress.get() > 0.8 ? servicesExitOpacity : servicesOpacity,
              scale: scrollYProgress.get() > 0.8 ? servicesExitScale : servicesScale
            }}
          >
            {/* Service 1 - Top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-to-r from-whale-secondary-light to-whale-secondary-deep p-4 rounded-lg shadow-lg w-48">
                <h3 className="text-sm font-semibold text-white mb-1">Tool Implementation</h3>
                <p className="text-xs text-white/90">Configure project management platforms</p>
              </div>
            </div>

            {/* Service 2 - Right */}
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-to-r from-whale-secondary-deep to-whale-secondary-dark p-4 rounded-lg shadow-lg w-48">
                <h3 className="text-sm font-semibold text-white mb-1">Automation & Integration</h3>
                <p className="text-xs text-white/90">Build automation rules and integrations</p>
              </div>
            </div>

            {/* Service 3 - Left */}
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-to-r from-whale-secondary-dark to-whale-secondary-deep p-4 rounded-lg shadow-lg w-48">
                <h3 className="text-sm font-semibold text-white mb-1">Training & Adoption</h3>
                <p className="text-xs text-white/90">Deliver training for 90%+ adoption</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 