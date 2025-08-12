'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Water ripple effect component
const WaterRipple = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    }
    
    setRipples([...ripples, newRipple])
    
    // Call the parent onClick
    onClick()
  }

  return (
    <div 
      onClick={handleClick} 
      className="relative overflow-hidden cursor-pointer group"
    >
      {children}
      
      {/* Water ripples */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full bg-whale-secondary-light/40 pointer-events-none"
            style={{ 
              left: ripple.x - 25, 
              top: ripple.y - 25,
              width: 50,
              height: 50
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ 
              scale: [0, 1, 2, 3],
              opacity: [0.8, 0.6, 0.4, 0]
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              times: [0, 0.3, 0.6, 1]
            }}
            onAnimationComplete={() => {
              setRipples(ripples.filter(r => r.id !== ripple.id))
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Service data
const services = [
  {
    id: 'website-design',
    title: 'Website Design',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Website Design, Local SEO & Marketing',
    bullets: [
      'Build affordable, custom WordPress websites tailored to your brand',
      'Optimize with local SEO to rank higher in [Your City] searches',
      'Integrate Mailchimp newsletters for customer engagement',
      'Set up Stripe payments to convert visitors into customers'
    ],
    gradient: 'from-whale-primary to-whale-secondary-light'
  },
  {
    id: 'tool-implementation',
    title: 'Tool Implementation',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    description: 'Configure project management platforms',
    bullets: [
      'Set up workflows and boards to streamline tasks',
      'Configure platforms like Wrike, ClickUp, and Jira',
      'Customize dashboards for team visibility',
      'Establish best practices and standard operating procedures'
    ],
    gradient: 'from-whale-secondary-light to-whale-secondary-deep'
  },
  {
    id: 'automation',
    title: 'Automation & Integration',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: 'Build automation rules and integrations',
    bullets: [
      'Create automation rules to cut manual work',
      'Build integrations (e.g., Wrike-HubSpot)',
      'Align processes across multiple platforms',
      'Monitor and optimize automation performance'
    ],
    gradient: 'from-whale-secondary-deep to-whale-secondary-dark'
  },
  {
    id: 'training',
    title: 'Training & Adoption',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    description: 'Deliver training and support',
    bullets: [
      'Achieve 90%+ team adoption rates',
      'Provide comprehensive training programs',
      'Offer ongoing support and troubleshooting',
      'Measure and track adoption success metrics'
    ],
    gradient: 'from-whale-secondary-dark to-whale-secondary-deep'
  }
]

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(services[0])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-whale-secondary-dark mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your workflow and boost team productivity with our comprehensive solutions
          </p>
        </div>

        {/* Interactive Service Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {services.map((service) => (
            <WaterRipple key={service.id} onClick={() => setSelectedService(service)}>
              <motion.div
                className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg flex items-center justify-center transition-all duration-300 ${
                  selectedService.id === service.id 
                    ? 'scale-110 shadow-xl ring-4 ring-whale-primary/30' 
                    : 'scale-100 hover:scale-105'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.icon}
              </motion.div>
              <div className="text-center mt-3">
                <p className={`text-sm font-medium ${
                  selectedService.id === service.id 
                    ? 'text-whale-secondary-dark' 
                    : 'text-gray-600'
                }`}>
                  {service.title}
                </p>
              </div>
            </WaterRipple>
          ))}
          </div>

        {/* Dynamic Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedService.id}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`bg-gradient-to-r ${selectedService.gradient} p-8 rounded-2xl shadow-xl`}>
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedService.title}
                </h3>
                <p className="text-white/90 text-lg">
                  {selectedService.description}
                </p>
          </div>

              <div className="grid md:grid-cols-2 gap-4">
                {selectedService.bullets.map((bullet, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2"></div>
                    <p className="text-white/90 leading-relaxed">{bullet}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
} 