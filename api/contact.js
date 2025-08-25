export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { name, email, company, projectType, timeline, budget, message } =
      req.body;

    // Validate required fields
    if (!name || !email || !projectType || !timeline || !budget || !message) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Always return success, even if email fails
    let emailSent = false;

    // Try to send email if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        // Dynamic import for Resend (since it's an ES module)
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send notification email to Nicholas with more details
        await resend.emails.send({
          from: "onboarding@resend.dev", // Use verified domain
          to: ["nicholascents77@gmail.com"],
          subject: `🚀 New Project Inquiry from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">New Contact Form Submission</h2>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Company:</strong> ${company || "Not provided"}</p>
              </div>
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Project Details</h3>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Timeline:</strong> ${timeline}</p>
                <p><strong>Budget:</strong> ${budget}</p>
              </div>
              <div style="background: #fefefe; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h3 style="margin-top: 0;">Message</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
                This email was sent from your portfolio contact form at ${new Date().toLocaleString()}.
              </p>
            </div>
          `,
        });

        emailSent = true;
        console.log(
          "Email notifications sent successfully to nicholascents77@gmail.com"
        );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue anyway - don't fail the form submission
      }
    } else {
      console.log("RESEND_API_KEY not configured - email not sent");
    }

    // Log successful submission
    console.log(`New contact submission from ${name} (${email})`);
    console.log(
      `Project: ${projectType}, Timeline: ${timeline}, Budget: ${budget}`
    );
    console.log(`Email sent: ${emailSent}`);

    // Always return success
    res.status(200).json({
      message:
        "Thank you for your message! I'll review your project details and get back to you within 24-48 hours.",
      id: `submission-${Date.now()}`,
      emailSent,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    // Return success anyway to prevent form failure
    res.status(200).json({
      message:
        "Thank you for your message! I'll review your project details and get back to you soon.",
      id: `submission-${Date.now()}`,
      note: "Message received but email delivery may be delayed",
    });
  }
}
