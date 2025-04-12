import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('Missing Resend API key. Please check your environment variables.');
  throw new Error('Missing Resend API key. Please check your environment variables.');
}

const resend = new Resend(RESEND_API_KEY);

const handler: Handler = async (event) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ success: false, error: 'Missing request body' }),
      };
    }

    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ success: false, error: 'Missing required fields' }),
      };
    }

    // Send notification email to admin
    const adminResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sarwannandhofficial672007@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    // Send auto-response to customer
    const customerResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for contacting us',
      text: `Hi ${name},\n\nThank you for reaching out. We have received your message and will get back to you soon.\n\nBest regards,\nSarwan Nandh`,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        success: true,
        adminResponse,
        customerResponse
      }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email',
        details: error
      }),
    };
  }
};

export { handler }; 