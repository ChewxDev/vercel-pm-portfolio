// Vercel API function for projects endpoint
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Static project data for portfolio
    const projects = [
      {
        id: "1",
        title: "Inventory Management System Implementation",
        description:
          "Led cross-functional implementation of new inventory management software for precious metals, jewelry, and collectibles worth over $2M, training 8 staff members and reducing transaction processing time by 25%.",
        category: "ERP Implementation",
        status: "Completed",
        duration: "6 months",
        team_size: 8,
        budget: "$2,000,000",
        client: "US Pawn & Jewelry",
        company: "US Pawn & Jewelry",
        teamSize: 8,
        icon: "fas fa-gem",
        color: "primary",
        skills: [
          "Executive Support",
          "Inventory Management",
          "Staff Training",
          "Process Optimization",
          "Vendor Coordination",
        ],
        metrics: [
          { value: "25%", description: "Reduction in Processing Time" },
          { value: "40%", description: "Faster Document Retrieval" },
          { value: "$12K", description: "Cost Savings Identified" },
        ],
        responsibilities: [
          "Led cross-functional team including IT, operations, and compliance staff",
          "Managed executive calendars and coordinated high-priority meetings with vendors",
          "Processed daily inventory reports for $2M+ in precious metals and jewelry",
          "Maintained confidential customer databases ensuring 100% compliance",
        ],
        achievements: [
          "Trained 8 staff members on new inventory management software",
          "Reduced transaction processing time by 25%",
          "Improved document retrieval time by 40%",
          "Identified cost-saving opportunities totaling $12,000 in first quarter",
        ],
        technologies: [
          "Inventory Management Software",
          "Digital Filing Systems",
          "CRM",
          "Database Management",
        ],
        challenges: [
          "Managing $2M+ inventory with complete accuracy and compliance",
          "Training 8 staff members on new digital systems",
          "Coordinating between multiple departments efficiently",
          "Maintaining 98% scheduling accuracy in fast-paced environment",
        ],
        solutions: [
          "Implemented comprehensive training program for 8 staff members",
          "Streamlined operations with digital filing systems",
          "Established clear compliance documentation processes",
          "Created efficient vendor coordination workflows",
        ],
        outcomes: [
          "25% reduction in transaction processing time",
          "40% improvement in document retrieval efficiency",
          "Maintained 98% scheduling accuracy in fast-paced environment",
          "Increased VIP customer sales by 15% through better coordination",
        ],
        methodologies: ["Agile", "Scrum", "Change Management"],
        key_milestones: [
          {
            milestone: "Requirements Gathering Complete",
            date: "2024-02-15",
            status: "Completed",
          },
          {
            milestone: "System Architecture Design",
            date: "2024-03-01",
            status: "Completed",
          },
          {
            milestone: "Phase 1 Implementation",
            date: "2024-05-15",
            status: "Completed",
          },
          {
            milestone: "Full System Deployment",
            date: "2024-08-30",
            status: "Completed",
          },
        ],
      },
      {
        id: "2",
        title: "Digital Content Strategy & Project Management",
        description:
          "Led social media strategy and project management for multi-platform content creation, achieving 50% increase in YouTube views and 25% growth in Twitch followers while reducing project turnaround time by 20%.",
        category: "Digital Marketing & PM",
        status: "Completed",
        duration: "12 months",
        team_size: 6,
        budget: "$150,000",
        client: "Convertain Limited",
        company: "Convertain Limited",
        teamSize: 6,
        icon: "fas fa-video",
        color: "secondary",
        skills: [
          "Social Media Strategy",
          "Project Management",
          "Content Creation",
          "KPI Tracking",
          "Team Coordination",
        ],
        metrics: [
          { value: "50%", description: "Increase in YouTube Views" },
          { value: "25%", description: "Twitch Follower Growth" },
          { value: "20%", description: "Faster Project Turnaround" },
        ],
        responsibilities: [
          "Monitored high-impact moments across Twitch streams and 4 YouTube channels",
          "Created and executed data-driven social media strategies",
          "Tracked KPIs including engagement rates and follower growth",
          "Led end-to-end campaign execution ensuring deadlines and budgets were met",
        ],
        achievements: [
          "Drove 50% increase in average video views on YouTube",
          "Grew YouTube subscribers by 20% and Twitch followers by 25%",
          "Reduced project turnaround time by 20% through streamlined workflows",
          "Built strong audience relationships through real-time interactions",
        ],
        technologies: [
          "YouTube Analytics",
          "Twitch",
          "Social Media Management Tools",
          "Content Creation Software",
        ],
        challenges: [
          "Managing content across multiple platforms simultaneously",
          "Identifying high-impact moments for repurposing",
          "Meeting quarterly growth targets across different metrics",
          "Coordinating with creators, designers, and marketing teams",
        ],
        solutions: [
          "Developed systematic monitoring process for content identification",
          "Created data-driven strategies aligned with platform algorithms",
          "Implemented streamlined workflows reducing turnaround time",
          "Established clear communication protocols with cross-functional teams",
        ],
        outcomes: [
          "50% increase in average YouTube video views",
          "Combined subscriber growth of 20% across YouTube channels",
          "25% increase in Twitch follower engagement",
          "Improved campaign efficiency with 20% faster delivery",
        ],
        methodologies: ["Agile", "DevOps", "Lean Six Sigma"],
        key_milestones: [
          {
            milestone: "Discovery & Assessment",
            date: "2023-06-01",
            status: "Completed",
          },
          {
            milestone: "Architecture Design",
            date: "2023-08-15",
            status: "Completed",
          },
          {
            milestone: "MVP Launch",
            date: "2024-01-20",
            status: "Completed",
          },
          {
            milestone: "Full Platform Launch",
            date: "2024-07-30",
            status: "Completed",
          },
        ],
      },
      {
        id: "3",
        title: "AI Project Portfolio Management",
        description:
          "Managed multiple AI projects simultaneously as Project Manager/XA Facilitator, delivering 92% of projects within budget while improving delivery efficiency by 25% and maintaining 88% success rate.",
        category: "AI & Technology PM",
        status: "Completed",
        duration: "12 months",
        team_size: 12,
        budget: "$500,000",
        client: "Lean Geeks (Xagency)",
        company: "Lean Geeks (Xagency)",
        teamSize: 12,
        icon: "fas fa-robot",
        color: "purple",
        skills: [
          "AI Project Management",
          "Cross-functional Leadership",
          "Risk Management",
          "Process Improvement",
          "Stakeholder Management",
        ],
        metrics: [
          { value: "92%", description: "Projects Delivered Within Budget" },
          { value: "25%", description: "Efficiency Improvement" },
          { value: "88%", description: "Project Success Rate" },
        ],
        responsibilities: [
          "Managed multiple AI projects simultaneously ensuring timely completion",
          "Coordinated with cross-functional teams including data scientists and engineers",
          "Conducted project planning, monitoring, and control activities",
          "Developed and maintained comprehensive project documentation",
        ],
        achievements: [
          "Successfully delivered 92% of AI projects within budget constraints",
          "Improved project delivery efficiency by 25% through process improvements",
          "Maintained project success rate of 88% or higher throughout tenure",
          "Reduced time-to-hire by 20% and improved candidate quality by 30%",
        ],
        technologies: [
          "AI/ML Platforms",
          "Project Management Software",
          "Data Analytics Tools",
          "Collaboration Platforms",
        ],
        challenges: [
          "Managing multiple complex AI projects simultaneously",
          "Coordinating diverse technical teams with varying expertise",
          "Ensuring projects stayed within budget and scope",
          "Identifying and mitigating technical and business risks",
        ],
        solutions: [
          "Implemented robust project planning and monitoring frameworks",
          "Established clear communication protocols between technical teams",
          "Developed risk assessment and mitigation strategies",
          "Created standardized documentation and reporting processes",
        ],
        outcomes: [
          "92% of AI projects completed within allocated budget",
          "25% improvement in overall project delivery efficiency",
          "Consistent 88%+ project success rate maintained",
          "Enhanced team performance through improved hiring processes",
        ],
        methodologies: ["Agile", "Design Thinking", "User-Centered Design"],
        key_milestones: [
          {
            milestone: "UX/UI Design Complete",
            date: "2023-09-30",
            status: "Completed",
          },
          {
            milestone: "MVP Beta Release",
            date: "2023-12-15",
            status: "Completed",
          },
          {
            milestone: "iOS App Store Launch",
            date: "2024-03-01",
            status: "Completed",
          },
          {
            milestone: "Android Play Store Launch",
            date: "2024-03-15",
            status: "Completed",
          },
        ],
      },
      {
        id: "4",
        title: "Administrative Process Optimization",
        description:
          "Streamlined administrative operations as Virtual Assistant, implementing improved processes for filing systems, customer communications, and HR documentation while maintaining high accuracy and efficiency standards.",
        category: "Operations & Administration",
        status: "Completed",
        duration: "6 months",
        team_size: 5,
        budget: "$75,000",
        client: "Truswell",
        company: "Truswell",
        teamSize: 5,
        icon: "fas fa-cogs",
        color: "orange",
        skills: [
          "Administrative Excellence",
          "Process Improvement",
          "Customer Service",
          "Documentation Management",
          "Virtual Collaboration",
        ],
        metrics: [
          { value: "95%", description: "Customer Satisfaction Rate" },
          { value: "30%", description: "Process Efficiency Gain" },
          { value: "100%", description: "Accuracy in Documentation" },
        ],
        responsibilities: [
          "Managed electronic and paper filing systems with accurate record keeping",
          "Provided customer support via chat and maintained service quality",
          "Recorded HR changes including hires, transfers, and classifications",
          "Completed business correspondence, transcription, and data entry",
        ],
        achievements: [
          "Identified and implemented process improvements for enhanced efficiency",
          "Created detailed administrative procedures driving accuracy and quality",
          "Improved customer communication processes and response times",
          "Maintained 100% accuracy in documentation and data entry",
        ],
        technologies: [
          "Document Management Systems",
          "CRM Software",
          "Chat Support Platforms",
          "Data Entry Tools",
        ],
        challenges: [
          "Managing both electronic and paper filing systems efficiently",
          "Maintaining accuracy across multiple administrative tasks",
          "Providing consistent customer service in remote environment",
          "Streamlining outdated processes for better efficiency",
        ],
        solutions: [
          "Developed systematic approaches for document management",
          "Created standardized procedures for common administrative tasks",
          "Implemented quality control measures for accuracy assurance",
          "Established efficient communication protocols with customers",
        ],
        outcomes: [
          "Significantly improved accuracy and efficiency of administrative processes",
          "Enhanced customer satisfaction through better communication",
          "Streamlined daily operations and recordkeeping procedures",
          "Established sustainable processes for long-term operational excellence",
        ],
        methodologies: ["Waterfall", "Risk Management", "Quality Assurance"],
        key_milestones: [
          {
            milestone: "Data Assessment Complete",
            date: "2023-05-15",
            status: "Completed",
          },
          {
            milestone: "Migration Strategy Approved",
            date: "2023-07-01",
            status: "Completed",
          },
          {
            milestone: "Pilot Migration Success",
            date: "2023-11-30",
            status: "Completed",
          },
          {
            milestone: "Full Migration Complete",
            date: "2024-04-15",
            status: "Completed",
          },
        ],
      },
    ];

    res.status(200).json(projects);
  } catch (error) {
    console.error("Projects API Error:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
}
