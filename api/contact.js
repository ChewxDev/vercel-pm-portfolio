export default async function handler(req, res) {
  // Always set CORS headers first
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // Parse request body safely
    let body;
    try {
      body = req.body || {};
    } catch (parseError) {
      console.error("Body parse error:", parseError);
      return res.status(200).json({
        message: "Thank you for your message! We received it successfully.",
        id: `submission-${Date.now()}`,
        note: "Contact received",
      });
    }

    const { name, email, company, projectType, timeline, budget, message } =
      body;

    // Log submission
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Name:", name || "Not provided");
    console.log("Email:", email || "Not provided");
    console.log("Company:", company || "Not provided");
    console.log("Project Type:", projectType || "Not provided");
    console.log("Timeline:", timeline || "Not provided");
    console.log("Budget:", budget || "Not provided");
    console.log("Message:", message || "Not provided");

    let emailSent = false;

    // Try to send email only if API key exists
    if (process.env.RESEND_API_KEY && name && email) {
      try {
        console.log("Attempting to send email...");

        const emailData = {
          from: "onboarding@resend.dev",
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
                <p><strong>Project Type:</strong> ${
                  projectType || "Not provided"
                }</p>
                <p><strong>Timeline:</strong> ${timeline || "Not provided"}</p>
                <p><strong>Budget:</strong> ${budget || "Not provided"}</p>
              </div>
              <div style="background: #fefefe; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h3 style="margin-top: 0;">Message</h3>
                <p style="white-space: pre-wrap;">${
                  message || "No message provided"
                }</p>
              </div>
              <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
                This email was sent from your portfolio contact form at ${new Date().toLocaleString()}.
              </p>
            </div>
          `,
        };

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Email sent successfully:", result.id);
          emailSent = true;
        } else {
          const error = await response.text();
          console.log("⚠️ Email failed:", response.status, error);
        }
      } catch (emailError) {
        console.log("⚠️ Email error:", emailError.message);
      }
    } else {
      console.log("Skipping email - missing API key or required fields");
    }

    console.log("Email sent status:", emailSent);
    console.log("=== END SUBMISSION ===");

    // Always return 200 success
    return res.status(200).json({
      message:
        "Thank you for your message! I'll review your project details and get back to you within 24-48 hours.",
      id: `submission-${Date.now()}`,
      emailSent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Even if everything fails, return success
    console.error("Handler error:", error);

    try {
      return res.status(200).json({
        message: "Thank you for your message! We received it successfully.",
        id: `submission-${Date.now()}`,
        note: "Contact received",
      });
    } catch (responseError) {
      // Last resort
      console.error("Response error:", responseError);
      return;
    }
  }
}
