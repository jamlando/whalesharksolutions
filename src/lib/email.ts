import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Welcome email will not be sent.');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Taylor at Whale Shark Solutions <taylor@whalesharksolutions.com>',
      to: email,
      subject: 'Welcome to Whale Shark Solutions!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://www.whalesharksolutions.com/images/wSharkMain.svg" alt="Whale Shark Solutions Logo" style="width: 200px; margin: 20px auto; display: block;" />
          <h1 style="color: #002D40; text-align: center;">Welcome to Whale Shark Solutions!</h1>
          <p style="color: #333; line-height: 1.6;">
            Thank you for your interest in Whale Shark Solutions. We're excited to have you join our community!
          </p>
          <p style="color: #333; line-height: 1.6;">
            We'll be in touch soon with more information about our services and how we can help your business grow.
          </p>
          <p style="color: #333; line-height: 1.6;">
            Best regards,<br>
            The Whale Shark Solutions Team
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email');
    }

    console.log('Welcome email sent successfully:', {
      email,
      emailId: data?.id,
      timestamp: new Date().toISOString(),
    });

    return data;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
} 