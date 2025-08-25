import { z } from "zod";

// Contact form validation schema
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

// Project type definition
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  duration: string;
  team_size: number;
  teamSize: number; // ADD THIS
  budget: string;
  client: string;
  company: string; // ADD THIS
  icon: string; // ADD THIS
  technologies: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  methodologies: string[];
  key_milestones: Array<{
    milestone: string;
    date: string;
    status: string;
  }>;
  skills_used: string[];
  skills: string[]; // ADD THIS
  metrics: Array<{
    label: string;
    value: string;
    improvement: string;
    description: string; // ADD THIS
  }>;
  responsibilities: string[];
  achievements: string[];
  color: string;
}
