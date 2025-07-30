'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AnimatedTagline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Tagline animations - start when logo is 50% size, complete when logo is 1% size
  const taglineY = useTransform(scrollYProgress, [0.25, 0.49], [100, 0])
  const taglineOpacity = useTransform(scrollYProgress, [0.25, 0.49], [0, 1])
  const taglineScale = useTransform(scrollYProgress, [0.25, 0.49], [0.8, 1])

  // Tagline exit animations - minimize and disappear
  const taglineExitY = useTransform(scrollYProgress, [0.7, 1], [0, -100])
  const taglineExitOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0])
  const taglineExitScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.3])

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 flex items-end justify-center pb-32 z-30"
      style={{
        y: scrollYProgress.get() > 0.7 ? taglineExitY : taglineY,
        opacity: scrollYProgress.get() > 0.7 ? taglineExitOpacity : taglineOpacity,
        scale: scrollYProgress.get() > 0.7 ? taglineExitScale : taglineScale
      }}
      initial={{ opacity: 0 }}
    >
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-4xl mx-4">
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-extralight text-white text-center">
          "Gentle Giants of Software Solutions"
        </h2>
      </div>
    </motion.div>
  )
} 