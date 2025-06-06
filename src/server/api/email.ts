import { Resend } from 'resend';

const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error('Missing Resend API key. Please check your environment variables.');
}

const resend = new Resend(RESEND_API_KEY);

export async function POST(request: Request) {
  // Handle CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Send notification email to admin
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sarwannandhofficial672007@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    // Send auto-response to customer
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for contacting us',
      text: `Hi ${name},\n\nThank you for reaching out. We have received your message and will get back to you soon.\n\nBest regards,\nSarwan Nandh`,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send email' }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    );
  }
} 