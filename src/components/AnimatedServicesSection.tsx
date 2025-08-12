'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

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
    title: 'Web Design',
    icon: (
      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Website Design, Local SEO & Marketing',
    bullets: [
      'Build affordable, custom websites tailored to your brand',
      'Optimize with local SEO to rank higher in [Your City] searches',
      'Create engaging customer newsletters and marketing campaigns',
      'Cutting-edge tech, design and mobile-friendly UI for modern businesses'
    ],
    gradient: 'from-whale-primary to-whale-secondary-light'
  },
  {
    id: 'tool-implementation',
    title: 'Tool Setup',
    icon: (
      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l6 6"/>
      </svg>
    ),
    description: 'Seamless Tech Tool Integration',
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
    title: 'Automation',
    icon: (
      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    title: 'Training',
    icon: (
      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function AnimatedServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const [selectedService, setSelectedService] = useState(services[0])
  const [previousService, setPreviousService] = useState(services[0])

  // Helper function to get service index
  const getServiceIndex = (serviceId: string) => {
    return services.findIndex(service => service.id === serviceId)
  }




  // Calculate the overall fin flow position for smooth animation
  const getFinFlowPosition = () => {
    const selectedIndex = getServiceIndex(selectedService.id)
    const previousIndex = getServiceIndex(previousService.id)
    
    // Calculate the direction and create a smooth flow
    if (selectedIndex === previousIndex) return 0
    
    const direction = selectedIndex > previousIndex ? 1 : -1
    const distance = Math.abs(selectedIndex - previousIndex)
    
    // Create a smooth flow that moves across the entire screen
    return direction * distance * 120
  }

  // Get the current fin position for the single whale shark
  const getCurrentFinPosition = (serviceId: string) => {
    const selectedIndex = getServiceIndex(serviceId)
    
    // On mobile (sm and below), return 0 to keep whale shark centered
    // On larger screens, calculate position for animation
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 0
    }
    
    // Calculate position based on the responsive grid layout
    // The grid now uses max-w-4xl (896px) with 4 columns and responsive gaps
    const containerWidth = 896 // max-w-4xl
    const gap = 12 // gap-3 (mobile), will be adjusted for larger screens
    const availableWidth = containerWidth - (gap * 3) // Account for 3 gaps between 4 columns
    const columnWidth = availableWidth / 4 // Each column width
    
    // Calculate the center of each column
    const position = (selectedIndex * columnWidth) + (selectedIndex * gap) + (columnWidth / 2)
    
    // Center the whale shark icon based on current screen size
    // Mobile: 48px (24px offset), Tablet: 64px (32px offset), Desktop: 96px (48px offset)
    const iconOffset = 24 // Half of 48px icon width (mobile default)
    
    return position - iconOffset
  }

  // Services animations - slide into view at full size, start earlier to reduce gap
  const servicesY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0])
  const servicesOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 1])
  const servicesScale = useTransform(scrollYProgress, [0.2, 0.5], [1, 1])

  // Services exit animations - minimize and disappear
  const servicesExitY = useTransform(scrollYProgress, [0.8, 1], [0, -50])
  const servicesExitOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0])
  const servicesExitScale = useTransform(scrollYProgress, [0.8, 1], [1, 0.5])

  return (
    <motion.section 
      ref={containerRef}
      className="py-8 relative z-10"
      style={{
        y: scrollYProgress.get() > 0.8 ? servicesExitY : servicesY,
        opacity: scrollYProgress.get() > 0.8 ? servicesExitOpacity : servicesOpacity,
        scale: scrollYProgress.get() > 0.8 ? servicesExitScale : servicesScale
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-4">
            "Gentle Giants of Software Solutions"
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Our Services
          </h3>
          <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-lg text-white font-medium">
              Streamline your workflow and boost team productivity with our comprehensive solutions
            </p>
          </div>
        </div>

        {/* Interactive Service Icons */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-2 max-w-4xl mx-auto relative">
          {services.map((service) => (
            <WaterRipple key={service.id} onClick={() => {
              setPreviousService(selectedService)
              setSelectedService(service)
            }}>
              <div className="flex flex-col items-center justify-center h-[100px] sm:h-[160px] md:h-[200px] lg:h-[240px] pt-4 sm:pt-6 md:pt-8">
                <div className="flex flex-col items-center justify-center w-full">
                                    {/* Service Icon */}
                  <div className={`w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 z-30 transition-all duration-300 flex items-center justify-center ${
                    selectedService.id === service.id 
                      ? 'scale-110 drop-shadow-[0_0_20px_rgba(249,159,129,0.6)]' 
                      : 'scale-100 hover:scale-105'
                  }`}>
                    <div className={`${selectedService.id === service.id ? 'text-whale-primary' : 'text-white'}`}>
                      {service.icon}
                    </div>
                  </div>
                  
                                    {/* Service Title - Hidden on mobile, visible on larger screens */}
                  <div className="hidden sm:block text-center mt-2 px-1 sm:px-2 min-h-[40px] sm:min-h-[50px] md:min-h-[60px] lg:min-h-[70px] flex items-center justify-center w-full">
                    <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold leading-tight ${
                      selectedService.id === service.id 
                        ? 'text-whale-primary drop-shadow-lg' 
                        : 'text-white/80'
                    }`}>
                      {service.title}
                    </p>
                  </div>
            </div>
              </div>
            </WaterRipple>
          ))}
          
          {/* Single Animated Whale Shark - Hidden on mobile, visible on larger screens */}
          <motion.div
            className="hidden sm:block absolute top-[80px] sm:top-[100px] md:top-[140px] lg:top-[200px] z-20 left-1/2 sm:left-0 transform -translate-x-1/2 sm:transform-none"
            animate={{
              x: getCurrentFinPosition(selectedService.id)
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <img 
              src="/images/Icons8/icons8-sharkBW-100.png" 
              alt="Whale Shark"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-300 scale-x-[-1] brightness-0 invert sepia saturate-10000 hue-rotate-[340deg] drop-shadow-[0_0_20px_rgba(249,159,129,0.9)] drop-shadow-[0_0_40px_rgba(249,159,129,0.6)] drop-shadow-[0_0_8px_rgba(0,0,0,1)] drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
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
            <div className={`bg-gradient-to-r ${selectedService.gradient} p-8 rounded-2xl shadow-xl relative z-10`}>
              {/* Ocean Wave Effect - Visible on all screen sizes with radiant color */}
              <div className="absolute -top-8 left-0 w-full h-12 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path 
                    d="M0,0 C10,2 20,10 30,4 C40,-2 50,10 60,4 C70,-2 80,10 90,4 C95,1 100,4 100,0 L100,12 Q100,12 100,12 L0,12 Q0,12 0,12 Z" 
                    fill={selectedService.id === 'website-design' ? '#f99f81' : selectedService.id === 'tool-implementation' ? '#f4b5a0' : selectedService.id === 'automation' ? '#e8a5a5' : '#f4b5a0'}
                  />
                </svg>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedService.title}
                </h3>
                <p className="text-white/90 text-lg">
                  {selectedService.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {selectedService.bullets.map((bullet, index) => (
          <motion.div 
                    key={index}
                    className="flex items-start space-x-4 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-3 h-3 bg-white rounded-full mt-2"></div>
                    <p className="text-white/90 leading-relaxed text-lg font-medium">{bullet}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  )
} 