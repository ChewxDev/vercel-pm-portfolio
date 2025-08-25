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

        // Send notification email to Nicholas
        await resend.emails.send({
          from: "onboarding@resend.dev", // Use verified domain
          to: ["nicholascents77@gmail.com"],
          subject: `New Project Inquiry from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });

        emailSent = true;
        console.log("Email notifications sent successfully");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue anyway - don't fail the form submission
      }
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
