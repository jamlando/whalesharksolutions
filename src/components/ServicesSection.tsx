'use client'

import React from 'react'

export default function ServicesSection() {
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

        <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-whale-secondary-light to-whale-secondary-deep p-8 rounded-lg shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-whale-primary rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Tool Implementation
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Configure project management platforms like Wrike, ClickUp, Jira setting up workflows and boards to streamline tasks
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-whale-secondary-deep to-whale-secondary-dark p-8 rounded-lg shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-whale-primary rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Automation & Integration
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Build automation rules and integrations (e.g., Wrike-HubSpot) to cut manual work and align processes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-whale-secondary-dark to-whale-secondary-deep p-8 rounded-lg shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-whale-primary rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Training & Adoption
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Deliver training and support for 90%+ team adoption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 