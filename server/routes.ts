import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactFormEmail, sendAutoReply } from './email.js';

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get all resources
  app.get("/api/resources", async (_req, res) => {
    try {
      const resources = await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  // Create contact submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notifications
      try {
        await sendContactFormEmail(submission);
        await sendAutoReply(submission);
        console.log('Email notifications sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails - form submission is still valid
      }
      
      // Log successful submission
      console.log(`New contact submission received from ${submission.name} (${submission.email})`);
      console.log(`Project: ${submission.projectType}, Timeline: ${submission.timeline}, Budget: ${submission.budget}`);
      
      res.status(201).json({ 
        message: "Thank you for your message! I'll review your project details and get back to you within 24-48 hours.", 
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Get contact submissions (for admin purposes)
  app.get("/api/contact-submissions", async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
