import { NextResponse } from 'next/server'
import { createOrUpdateContact } from '@/lib/hubspot'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Create or update contact in HubSpot
    const { contact, isNew } = await createOrUpdateContact({ email })

    // Log successful subscription
    console.log(`Successfully ${isNew ? 'created' : 'updated'} contact in HubSpot:`, {
      contactId: contact.id,
      email,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { 
        message: isNew ? 'Successfully subscribed' : 'Successfully updated subscription',
        contactId: contact.id
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    // Log the error for debugging
    console.error('Subscription error:', {
      error,
      timestamp: new Date().toISOString(),
    })

    // Type guard to check if error is an Error object
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    // Return a user-friendly error message
    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
} 