import { type Project, type InsertProject, type Resource, type InsertResource, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProject(id: string): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getResource(id: string): Promise<Resource | undefined>;
  getAllResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private resources: Map<string, Resource>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.projects = new Map();
    this.resources = new Map();
    this.contactSubmissions = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize projects based on Nicholas's CV
    const projectsData: InsertProject[] = [
      {
        title: "Inventory Management System Implementation",
        company: "US Pawn & Jewelry",
        duration: "6 months",
        teamSize: "12 members",
        description: "Led cross-functional implementation of new inventory management software for precious metals, jewelry, and collectibles worth over $2M.",
        role: "Project Manager & Team Lead",
        responsibilities: [
          "Led cross-functional project team including IT, operations, and compliance staff",
          "Designed comprehensive training program for new inventory management software",
          "Coordinated stakeholder communications and progress reporting to executive team",
          "Implemented quality assurance protocols and compliance monitoring systems"
        ],
        achievements: [
          "Reduced transaction processing time by 25% through streamlined workflows",
          "Achieved 100% compliance with state pawn regulations during implementation",
          "Improved document retrieval time by 40% with digital filing systems",
          "Maintained project timeline with zero budget overruns"
        ],
        metrics: [
          { label: "Processing Time Reduction", value: "25%", description: "Faster transaction processing" },
          { label: "Staff Members Trained", value: "8", description: "Team members successfully onboarded" },
          { label: "Inventory Value Managed", value: "$2M+", description: "Total merchandise tracked" }
        ],
        skills: ["Project Planning", "Staff Training", "Change Management", "Compliance Management"],
        color: "primary",
        icon: "fas fa-warehouse"
      },
      {
        title: "Multi-Platform Content Strategy Execution",
        company: "Convertain Limited",
        duration: "12 months",
        teamSize: "8 members",
        description: "Managed end-to-end campaign execution across Twitch and YouTube platforms, driving significant audience growth and engagement.",
        role: "Social Media Manager & Project Manager",
        responsibilities: [
          "Managed end-to-end campaign execution across Twitch and YouTube platforms",
          "Coordinated with creators, designers, and marketing teams for content alignment",
          "Monitored KPIs and adjusted strategies to meet quarterly growth targets",
          "Streamlined workflows to improve project turnaround times"
        ],
        achievements: [
          "Drove 50% increase in average YouTube video views through strategic content repurposing",
          "Grew combined channel subscribers by 20% and Twitch followers by 25%",
          "Reduced project turnaround time by 20% through process optimization",
          "Ensured all campaigns met deadlines, budgets, and quality standards"
        ],
        metrics: [
          { label: "Video Views Increase", value: "50%", description: "Average YouTube performance boost" },
          { label: "Follower Growth", value: "25%", description: "Twitch audience expansion" },
          { label: "Faster Project Delivery", value: "20%", description: "Reduced turnaround time" }
        ],
        skills: ["Campaign Management", "KPI Tracking", "Cross-functional Coordination", "Process Optimization"],
        color: "secondary",
        icon: "fas fa-video"
      },
      {
        title: "Digital Transformation Initiative",
        company: "Lean Geeks (Xagency)",
        duration: "12 months",
        teamSize: "15+ projects",
        description: "Managed simultaneous digital transformation projects with software engineers, designers, and stakeholders, ensuring high success rates and budget compliance.",
        role: "Project Manager & Digital Transformation Lead",
        responsibilities: [
          "Managed simultaneous digital transformation projects with software engineers and stakeholders",
          "Conducted comprehensive project planning, monitoring, and control activities",
          "Identified and mitigated project risks with corrective action implementation",
          "Maintained detailed project documentation and stakeholder communications"
        ],
        achievements: [
          "Successfully delivered 92% of digital projects within budget constraints",
          "Improved project delivery efficiency by 25% through process improvements",
          "Maintained project success rate of 88% or higher across portfolio",
          "Reduced time-to-hire by 20% through optimized recruitment processes"
        ],
        metrics: [
          { label: "On-Budget Delivery", value: "92%", description: "Projects completed within budget" },
          { label: "Project Success Rate", value: "88%", description: "Overall portfolio success" },
          { label: "Efficiency Improvement", value: "25%", description: "Process optimization gains" }
        ],
        skills: ["Portfolio Management", "Risk Mitigation", "Budget Control", "Team Coordination"],
        color: "purple",
        icon: "fas fa-laptop-code"
      },
      {
        title: "Administrative Process Optimization",
        company: "Truswell",
        duration: "6 months",
        teamSize: "5 members",
        description: "Streamlined administrative operations as Virtual Assistant, implementing improved processes for filing systems, customer communications, and HR documentation while maintaining high accuracy and efficiency standards.",
        role: "Virtual Assistant",
        responsibilities: [
          "Managed electronic and paper filing systems with accurate record keeping",
          "Provided customer support via chat and maintained service quality",
          "Recorded HR changes including hires, transfers, and classifications",
          "Completed business correspondence, transcription, and data entry"
        ],
        achievements: [
          "Identified and implemented process improvements for enhanced efficiency",
          "Created detailed administrative procedures driving accuracy and quality",
          "Improved customer communication processes and response times",
          "Maintained 100% accuracy in documentation and data entry"
        ],
        metrics: [
          { label: "Customer Satisfaction Rate", value: "95%", description: "High satisfaction maintained" },
          { label: "Process Efficiency Gain", value: "30%", description: "Improved workflow efficiency" },
          { label: "Accuracy in Documentation", value: "100%", description: "Perfect record keeping" }
        ],
        skills: ["Administrative Excellence", "Process Improvement", "Customer Service", "Documentation Management", "Virtual Collaboration"],
        color: "orange",
        icon: "fas fa-cogs"
      }
    ];

    // Initialize resources
    const resourcesData: InsertResource[] = [
      {
        title: "Project Planning Template",
        description: "Comprehensive project planning template with stakeholder matrix, timeline, and risk assessment framework.",
        fileType: "DOCX",
        fileSize: "2.3 MB",
        icon: "fas fa-file-alt",
        color: "primary",
        downloadUrl: "/resources/project-planning-template.docx"
      },
      {
        title: "Stakeholder Communication Plan",
        description: "Structured communication framework for managing stakeholder expectations and project updates.",
        fileType: "DOCX",
        fileSize: "1.8 MB",
        icon: "fas fa-users",
        color: "secondary",
        downloadUrl: "/resources/stakeholder-communication-plan.docx"
      },
      {
        title: "Process Improvement Checklist",
        description: "Step-by-step checklist for identifying inefficiencies and implementing process improvements.",
        fileType: "DOCX",
        fileSize: "1.2 MB",
        icon: "fas fa-tasks",
        color: "purple",
        downloadUrl: "/resources/process-improvement-checklist.docx"
      },
      {
        title: "Risk Assessment Matrix",
        description: "Comprehensive risk identification and mitigation planning framework with probability-impact analysis.",
        fileType: "CSV",
        fileSize: "2.1 MB",
        icon: "fas fa-exclamation-triangle",
        color: "orange",
        downloadUrl: "/resources/risk-assessment-matrix.csv"
      },
      {
        title: "Team Performance Dashboard",
        description: "KPI tracking template for monitoring team productivity, project milestones, and performance metrics.",
        fileType: "CSV",
        fileSize: "3.2 MB",
        icon: "fas fa-chart-bar",
        color: "blue",
        downloadUrl: "/resources/team-performance-dashboard.xlsx"
      },
      {
        title: "Project Closure Report Template",
        description: "Structured template for documenting project outcomes, lessons learned, and knowledge transfer.",
        fileType: "DOCX",
        fileSize: "1.5 MB",
        icon: "fas fa-clipboard-check",
        color: "green",
        downloadUrl: "/resources/project-closure-report.docx"
      }
    ];

    // Add projects to storage
    projectsData.forEach(project => {
      const id = randomUUID();
      this.projects.set(id, { ...project, id });
    });

    // Add resources to storage
    resourcesData.forEach(resource => {
      const id = randomUUID();
      this.resources.set(id, { ...resource, id });
    });
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getResource(id: string): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = randomUUID();
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = { 
      ...insertSubmission,
      company: insertSubmission.company || null,
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export const storage = new MemStorage();
