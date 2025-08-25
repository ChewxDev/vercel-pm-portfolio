import { Resend } from 'resend';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
  createdAt: Date;
}

// Lazy initialization of Resend client
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendContactFormEmail(submission: ContactSubmission): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not configured, skipping email');
      return false;
    }

    // Email template for contact form submission
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #2563eb; }
          .value { margin-left: 10px; }
          .footer { background: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>Portfolio Website - nicholascents77@gmail.com</p>
        </div>
        
        <div class="content">
          <h2>Contact Details</h2>
          
          <div class="field">
            <span class="label">Name:</span>
            <span class="value">${submission.name}</span>
          </div>
          
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${submission.email}</span>
          </div>
          
          ${submission.company ? `
          <div class="field">
            <span class="label">Company:</span>
            <span class="value">${submission.company}</span>
          </div>
          ` : ''}
          
          <div class="field">
            <span class="label">Project Type:</span>
            <span class="value">${submission.projectType}</span>
          </div>
          
          <div class="field">
            <span class="label">Timeline:</span>
            <span class="value">${submission.timeline}</span>
          </div>
          
          <div class="field">
            <span class="label">Budget:</span>
            <span class="value">${submission.budget}</span>
          </div>
          
          <h3>Message:</h3>
          <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; margin: 10px 0;">
            ${submission.message.replace(/\n/g, '<br>')}
          </div>
          
          <div class="field">
            <span class="label">Submitted:</span>
            <span class="value">${submission.createdAt.toLocaleString()}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was sent from your portfolio website contact form.</p>
          <p><strong>Nicholas Njoku</strong> - Project Manager Portfolio</p>
        </div>
      </body>
      </html>
    `;

    const resendClient = getResendClient();
    await resendClient.emails.send({
      from: 'Portfolio Contact <contact@resend.dev>',
      to: 'nicholascents77@gmail.com',
      subject: `New Contact Form Submission - ${submission.name}`,
      html: htmlContent,
      replyTo: submission.email
    });
    
    console.log('Contact form email sent successfully via Resend');
    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return false;
  }
}

// Auto-reply to the person who submitted the form
export async function sendAutoReply(submission: ContactSubmission): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not configured, skipping auto-reply');
      return false;
    }

    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Your Inquiry</h1>
          <p>Nicholas Njoku - Project Manager</p>
        </div>
        
        <div class="content">
          <p>Dear ${submission.name},</p>
          
          <p>Thank you for reaching out through my portfolio website. I have received your inquiry regarding <strong>${submission.projectType}</strong> and will review the details you provided.</p>
          
          <p>I will respond to your inquiry within 24-48 hours. In the meantime, feel free to explore my project case studies and downloadable project management templates on the website.</p>
          
          <p>Here's a summary of your submission:</p>
          <ul>
            <li><strong>Project Type:</strong> ${submission.projectType}</li>
            <li><strong>Timeline:</strong> ${submission.timeline}</li>
            <li><strong>Budget:</strong> ${submission.budget}</li>
            ${submission.company ? `<li><strong>Company:</strong> ${submission.company}</li>` : ''}
          </ul>
          
          <p>Best regards,<br>
          <strong>Nicholas Njoku</strong><br>
          Project Manager | PMP Certified<br>
          Asana Workflow Specialist<br>
          Email: nicholascents77@gmail.com</p>
        </div>
        
        <div class="footer">
          <p>This is an automated response. Please do not reply to this email.</p>
        </div>
      </body>
      </html>
    `;

    const resendClient = getResendClient();
    await resendClient.emails.send({
      from: 'Nicholas Njoku <contact@resend.dev>',
      to: submission.email,
      subject: 'Thank you for your inquiry - Nicholas Njoku',
      html: autoReplyHtml
    });
    
    console.log('Auto-reply sent successfully via Resend');
    return true;
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    return false;
  }
}