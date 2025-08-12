'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer 
      className="bg-black/60 backdrop-blur-sm text-white py-12 relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="mb-4">
            <Image
              src="/images/wSharkWhiteTransparentv1.svg"
              alt="Whale Shark Solutions"
              width={300}
              height={80}
              className="mx-auto"
              priority
            />
          </div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Streamlining workflows and boosting team productivity through expert tool implementation, 
            automation, and comprehensive training programs.
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
          <a
            href="https://www.linkedin.com/company/whale-shark-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-white/80 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Follow us on LinkedIn
          </a>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <p className="text-white/60 text-sm">
            © 2025 Whale Shark Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
} 