import { z } from "zod";

export const insertContactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type ContactSubmission = z.infer<
  typeof insertContactSubmissionSchema
> & {
  id: string;
  created_at: string;
};
