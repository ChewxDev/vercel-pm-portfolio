// Vercel API function for contact form endpoint
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, company, phone, projectType, timeline, budget, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: "Name, email, and message are required fields" 
      });
    }

    // Create a unique submission ID
    const submissionId = Date.now().toString();
    const submission = {
      id: submissionId,
      name,
      email,
      company: company || '',
      phone: phone || '',
      projectType: projectType || '',
      timeline: timeline || '',
      budget: budget || '',
      message,
      created_at: new Date().toISOString()
    };

    // Send email notification to Nicholas
    try {
      await resend.emails.send({
        from: 'Portfolio Contact Form <noreply@resend.dev>',
        to: ['nicholascents77@gmail.com'],
        subject: `New Project Inquiry from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not specified'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not specified'}</p>
          <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
        `
      });

      // Send auto-reply to the user
      await resend.emails.send({
        from: 'Nicholas Njoku - Project Manager <noreply@resend.dev>',
        to: [email],
        subject: 'Thank you for your project inquiry',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for your interest in working together. I have received your project inquiry and will review the details carefully.</p>
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>I will review your project requirements within 24-48 hours</li>
            <li>If your project aligns with my expertise, I'll reach out to schedule a consultation call</li>
            <li>We'll discuss your goals, timeline, and how I can help deliver successful outcomes</li>
          </ul>
          <p>In the meantime, feel free to explore my portfolio and case studies to learn more about my project management approach and past successes.</p>
          <p>Best regards,<br>Nicholas Njoku<br>Certified Project Manager</p>
          <hr>
          <p><small>This is an automated confirmation. Please do not reply to this email.</small></p>
        `
      });

      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails - form submission is still valid
    }

    // Log successful submission
    console.log(`New contact submission received from ${name} (${email})`);
    console.log(`Project: ${projectType}, Timeline: ${timeline}, Budget: ${budget}`);

    res.status(201).json({ 
      message: "Thank you for your message! I'll review your project details and get back to you within 24-48 hours.", 
      id: submissionId 
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    res.status(500).json({ message: "Failed to send message. Please try again." });
  }
}