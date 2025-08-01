import { NextResponse } from 'next/server'
import { createOrUpdateContact } from '@/lib/hubspot'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Send welcome email for new contacts
    if (isNew) {
      try {
        await sendWelcomeEmail(email)
      } catch (emailError) {
        // Log the error but don't fail the request
        console.error('Failed to send welcome email:', emailError)
      }
    }

    return NextResponse.json(
      { 
        message: isNew ? 'Successfully subscribed' : 'You have already signed up! We\'ll be in touch soon.',
        contactId: contact.id,
        isNew
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    // Enhanced error logging
    const errorDetails = {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      requestBody: await request.json().catch(() => 'Could not parse request body')
    }
    console.error('Subscription API Error:', errorDetails)

    // Return appropriate error response
    const statusCode = error instanceof Error && error.message.includes('not initialized') 
      ? 503 // Service Unavailable for missing API key
      : 500 // Internal Server Error for other cases

    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorDetails.errorMessage : undefined,
        debug: process.env.NODE_ENV === 'development' ? {
          hasHubSpotKey: !!process.env.HUBSPOT_API_KEY,
          hasPortalId: !!process.env.HUBSPOT_PORTAL_ID,
          errorMessage: error instanceof Error ? error.message : 'Unknown error type'
        } : undefined
      },
      { status: statusCode }
    )
  }
} 