export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, company, projectType, timeline, budget, message } = req.body;

    // Validate required fields
    if (!name || !email || !projectType || !timeline || !budget || !message) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Send email if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        // Dynamic import for Resend (since it's an ES module)
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send notification email to Nicholas
        await resend.emails.send({
          from: 'portfolio@nicholasnjoku.com',
          to: ['nicholascents77@gmail.com'],
          subject: `New Project Inquiry from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });

        // Send auto-reply to the contact
        await resend.emails.send({
          from: 'portfolio@nicholasnjoku.com',
          to: [email],
          subject: 'Thank you for your inquiry - Nicholas Njoku',
          html: `
            <h2>Thank you for your inquiry!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for reaching out about your ${projectType} project. I've received your message and will review your requirements carefully.</p>
            <p><strong>Your Project Details:</strong></p>
            <ul>
              <li>Project Type: ${projectType}</li>
              <li>Timeline: ${timeline}</li>
              <li>Budget: ${budget}</li>
            </ul>
            <p>I'll get back to you within 24-48 hours to discuss your project further.</p>
            <p>Best regards,<br>Nicholas Njoku<br>Project Manager</p>
          `
        });

        console.log('Email notifications sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Log successful submission
    console.log(`New contact submission from ${name} (${email})`);
    console.log(`Project: ${projectType}, Timeline: ${timeline}, Budget: ${budget}`);

    res.status(201).json({
      message: "Thank you for your message! I'll review your project details and get back to you within 24-48 hours.",
      id: `submission-${Date.now()}`
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
}