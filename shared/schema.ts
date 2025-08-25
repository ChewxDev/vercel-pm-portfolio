import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  company: text("company").notNull(),
  duration: text("duration").notNull(),
  teamSize: text("team_size").notNull(),
  description: text("description").notNull(),
  role: text("role").notNull(),
  responsibilities: jsonb("responsibilities").$type<string[]>().notNull(),
  achievements: jsonb("achievements").$type<string[]>().notNull(),
  metrics: jsonb("metrics").$type<{
    label: string;
    value: string;
    description: string;
  }[]>().notNull(),
  skills: jsonb("skills").$type<string[]>().notNull(),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
});

export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: text("file_size").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  downloadUrl: text("download_url").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type").notNull(),
  timeline: text("timeline").notNull(),
  budget: text("budget").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
