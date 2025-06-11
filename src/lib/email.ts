import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Utility function to get base64 encoded logo
function getBase64Logo() {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'wSharkMain.svg');
    const logoBuffer = fs.readFileSync(logoPath);
    const base64Logo = logoBuffer.toString('base64');
    return `data:image/svg+xml;base64,${base64Logo}`;
  } catch (error) {
    console.error('Error reading logo file:', error);
    return null;
  }
}

export async function sendWelcomeEmail(email: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Welcome email will not be sent.');
    return;
  }

  try {
    const base64Logo = getBase64Logo();
    const logoHtml = base64Logo 
      ? `<img src="${base64Logo}" alt="Whale Shark Solutions Logo" style="width: 200px; margin: 20px auto; display: block;" />`
      : '';

    const { data, error } = await resend.emails.send({
      from: 'Taylor at Whale Shark Solutions <taylor@whalesharksolutions.com>',
      to: email,
      subject: 'Welcome to Whale Shark Solutions!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${logoHtml}
          <h1 style="color: #002D40; text-align: center; margin-top: 20px;">Welcome to Whale Shark Solutions!</h1>
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            Thank you for your interest in Whale Shark Solutions. We're excited to have you join our community!
          </p>
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            We'll be in touch soon with more information about our services and how we can help your business grow.
          </p>
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
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