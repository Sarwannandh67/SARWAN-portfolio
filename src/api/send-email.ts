import { Resend } from 'resend';

export async function sendEmail(data: { name: string; email: string; message: string; apiKey: string }) {
  const { name, email, message, apiKey } = data;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  const resend = new Resend(apiKey);

  // Send notification email to admin
  const adminResponse = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'sarwannandhofficial672007@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  });

  // Send auto-response to the customer
  const customerResponse = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: email,
    subject: 'Thank you for your message',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          ${message}
        </div>
        <p>Best regards,</p>
        <p>Sarwan Nandh</p>
      </div>
    `
  });

  return { success: true };
} 