import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Utility function to get base64 encoded logo
function getBase64Logo() {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'wSharkDarkTransparentv1.svg');
    console.log('Attempting to read logo from:', logoPath);
    
    if (!fs.existsSync(logoPath)) {
      console.error('Logo file does not exist at path:', logoPath);
      return null;
    }

    const logoBuffer = fs.readFileSync(logoPath);
    console.log('Successfully read logo file, size:', logoBuffer.length, 'bytes');
    
    const base64Logo = logoBuffer.toString('base64');
    console.log('Successfully encoded logo to base64, length:', base64Logo.length);
    
    // Log a small sample of the base64 string to verify it's valid
    console.log('Base64 sample (first 50 chars):', base64Logo.substring(0, 50));
    
    const dataUrl = `data:image/svg+xml;base64,${base64Logo}`;
    console.log('Created data URL, length:', dataUrl.length);
    
    return dataUrl;
  } catch (error) {
    console.error('Error in getBase64Logo:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      cwd: process.cwd(),
      logoPath: path.join(process.cwd(), 'public', 'images', 'wSharkDarkTransparentv1.svg')
    });
    return null;
  }
}

export async function sendWelcomeEmail(email: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Welcome email will not be sent.');
    return;
  }

  try {
    console.log('Starting welcome email process for:', email);
    const base64Logo = getBase64Logo();
    
    if (!base64Logo) {
      console.warn('Failed to load logo, sending email without logo');
    } else {
      console.log('Successfully loaded logo for email');
    }
    
    const logoHtml = base64Logo 
      ? `<img src="${base64Logo}" alt="Whale Shark Solutions Logo" style="width: 200px; margin: 20px auto; display: block;" />`
      : '';

    const emailHtml = `
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
    `;

    console.log('Sending email with HTML length:', emailHtml.length);

    const { data, error } = await resend.emails.send({
      from: 'Taylor at Whale Shark Solutions <taylor@whalesharksolutions.com>',
      to: email,
      subject: 'Welcome to Whale Shark Solutions!',
      html: emailHtml,
    });

    if (error) {
      console.error('Failed to send welcome email:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message
        } : error,
        email
      });
      throw new Error('Failed to send welcome email');
    }

    console.log('Welcome email sent successfully:', {
      email,
      emailId: data?.id,
      timestamp: new Date().toISOString(),
    });

    return data;
  } catch (error) {
    console.error('Error sending welcome email:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      email
    });
    throw error;
  }
} 