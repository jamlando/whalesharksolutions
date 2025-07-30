'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function EmailSignupSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
      } else {
        // Handle different error scenarios
        if (response.status === 400) {
          if (data.error === 'Invalid email format') {
            setError('Please enter a valid email address')
          } else if (data.error === 'Email is required') {
            setError('Please enter your email address')
          } else {
            setError(data.error || 'Invalid request. Please check your email and try again.')
          }
        } else if (response.status === 409) {
          // User already subscribed
          setIsSubmitted(true)
          setEmail('')
        } else {
          setError('Something went wrong. Please try again later.')
        }
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.section 
      className="py-8 bg-black/20 backdrop-blur-sm relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to Streamline Your Workflow?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get more information about how Whale Shark Solutions can help your team boost productivity and efficiency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border ${
                      error ? 'border-red-400' : 'border-white/20'
                    } text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-whale-primary focus:border-transparent`}
                  />
                  {error && (
                    <p className="absolute -bottom-6 left-0 text-red-400 text-sm">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-whale-primary hover:bg-whale-primary-dark text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Get More Info'}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-6 max-w-md mx-auto"
            >
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Thank You!
              </h3>
              <p className="text-white/90">
                We'll be in touch soon with more information about Whale Shark Solutions.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
} 