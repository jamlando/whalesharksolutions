import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Log API key presence (not the actual key)
    console.log('RESEND_API_KEY present:', !!process.env.RESEND_API_KEY)
    
    const { email } = await request.json()
    console.log('Attempting to send test email to:', email)

    if (!email) {
      console.log('No email provided in request')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Send test email
    console.log('Sending email via Resend...')
    const { data, error } = await resend.emails.send({
      from: 'Taylor at Whale Shark Solutions <taylor@whalesharksolutions.com>',
      to: email,
      subject: 'Test Email from Whale Shark Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #002D40; text-align: center;">Test Email</h1>
          <p style="color: #333; line-height: 1.6;">
            This is a test email to verify the email sending functionality.
          </p>
          <p style="color: #333; line-height: 1.6;">
            If you're receiving this, the email configuration is working correctly!
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend API error:', {
        name: error.name,
        message: error.message,
        details: error
      })
      return NextResponse.json(
        { 
          error: 'Failed to send test email', 
          details: {
            name: error.name,
            message: error.message
          }
        },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', {
      id: data?.id,
      to: email,
      from: 'Taylor at Whale Shark Solutions <taylor@whalesharksolutions.com>'
    })

    return NextResponse.json(
      { 
        message: 'Test email sent successfully',
        emailId: data?.id
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error in test email endpoint:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    })
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error instanceof Error ? {
          name: error.name,
          message: error.message
        } : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 