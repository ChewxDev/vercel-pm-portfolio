// Vercel API function for projects endpoint
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Static project data for portfolio
    const projects = [
      {
        id: "1",
        title: "Inventory Management System Implementation",
        description: "Led the successful implementation of a comprehensive inventory management system for a mid-sized manufacturing company, resulting in 40% reduction in stock discrepancies and improved operational efficiency.",
        category: "ERP Implementation",
        status: "Completed",
        duration: "8 months",
        team_size: 12,
        budget: "$450,000",
        client: "Lean Geeks Manufacturing",
        technologies: ["SAP", "Python", "PostgreSQL", "React"],
        challenges: [
          "Legacy system integration",
          "Data migration from multiple sources",
          "Staff resistance to change",
          "Complex approval workflows"
        ],
        solutions: [
          "Implemented phased rollout strategy",
          "Developed custom API bridges for legacy systems",
          "Conducted comprehensive staff training program",
          "Designed intuitive user interfaces to reduce learning curve"
        ],
        outcomes: [
          "40% reduction in inventory discrepancies",
          "60% faster stock reconciliation process",
          "Real-time inventory tracking across 5 locations",
          "Improved supplier relationship management"
        ],
        methodologies: ["Agile", "Scrum", "Change Management"],
        key_milestones: [
          {
            milestone: "Requirements Gathering Complete",
            date: "2024-02-15",
            status: "Completed"
          },
          {
            milestone: "System Architecture Design",
            date: "2024-03-01",
            status: "Completed"
          },
          {
            milestone: "Phase 1 Implementation",
            date: "2024-05-15",
            status: "Completed"
          },
          {
            milestone: "Full System Deployment",
            date: "2024-08-30",
            status: "Completed"
          }
        ]
      },
      {
        id: "2",
        title: "Digital Transformation Initiative",
        description: "Spearheaded comprehensive digital transformation for a financial services company, modernizing legacy processes and implementing cloud-first architecture.",
        category: "Digital Transformation",
        status: "Completed",
        duration: "14 months",
        team_size: 25,
        budget: "$1,200,000",
        client: "SecureFinance Corp",
        technologies: ["AWS", "React", "Node.js", "MongoDB", "Docker"],
        challenges: [
          "Regulatory compliance requirements",
          "Legacy system dependencies", 
          "Multi-department coordination",
          "Security and data privacy concerns"
        ],
        solutions: [
          "Established comprehensive compliance framework",
          "Designed microservices architecture for gradual migration",
          "Implemented cross-functional team structure",
          "Applied DevSecOps practices throughout development"
        ],
        outcomes: [
          "75% improvement in process efficiency",
          "90% reduction in manual tasks",
          "Enhanced customer experience with real-time services",
          "Full regulatory compliance achieved"
        ],
        methodologies: ["Agile", "DevOps", "Lean Six Sigma"],
        key_milestones: [
          {
            milestone: "Discovery & Assessment",
            date: "2023-06-01",
            status: "Completed"
          },
          {
            milestone: "Architecture Design",
            date: "2023-08-15",
            status: "Completed"
          },
          {
            milestone: "MVP Launch",
            date: "2024-01-20",
            status: "Completed"
          },
          {
            milestone: "Full Platform Launch",
            date: "2024-07-30",
            status: "Completed"
          }
        ]
      },
      {
        id: "3",
        title: "Cross-Platform Mobile App Development",
        description: "Managed end-to-end development of a customer-facing mobile application for retail chain, integrating with existing POS systems and inventory management.",
        category: "Mobile Development",
        status: "Completed",
        duration: "10 months", 
        team_size: 8,
        budget: "$320,000",
        client: "RetailMax",
        technologies: ["React Native", "Node.js", "Firebase", "Redux", "Stripe"],
        challenges: [
          "Multi-platform consistency",
          "Real-time inventory synchronization",
          "Payment processing integration",
          "Offline functionality requirements"
        ],
        solutions: [
          "Implemented unified design system across platforms",
          "Built robust API layer with caching mechanisms",
          "Integrated multiple payment gateways with fallback options",
          "Developed progressive sync for offline-first architecture"
        ],
        outcomes: [
          "300,000+ app downloads in first 6 months",
          "45% increase in customer engagement",
          "Real-time inventory visibility across all channels",
          "99.9% uptime achieved for payment processing"
        ],
        methodologies: ["Agile", "Design Thinking", "User-Centered Design"],
        key_milestones: [
          {
            milestone: "UX/UI Design Complete",
            date: "2023-09-30",
            status: "Completed"
          },
          {
            milestone: "MVP Beta Release",
            date: "2023-12-15",
            status: "Completed"
          },
          {
            milestone: "iOS App Store Launch",
            date: "2024-03-01",
            status: "Completed"
          },
          {
            milestone: "Android Play Store Launch",
            date: "2024-03-15",
            status: "Completed"
          }
        ]
      },
      {
        id: "4",
        title: "Enterprise Data Migration Project",
        description: "Led complex data migration project from legacy mainframe systems to modern cloud infrastructure, ensuring zero data loss and minimal downtime.",
        category: "Data Migration",
        status: "Completed",
        duration: "12 months",
        team_size: 15,
        budget: "$680,000",
        client: "TechCorp Industries",
        technologies: ["AWS", "PostgreSQL", "Apache Airflow", "Python", "Terraform"],
        challenges: [
          "Massive data volume (500TB+)",
          "Complex data relationships",
          "Zero-downtime requirement",
          "Data quality inconsistencies"
        ],
        solutions: [
          "Implemented incremental migration strategy",
          "Built comprehensive data validation pipelines",
          "Designed automated rollback mechanisms",
          "Created data cleansing and transformation workflows"
        ],
        outcomes: [
          "100% data integrity maintained",
          "Zero downtime during cutover",
          "60% improvement in query performance",
          "Established modern data governance framework"
        ],
        methodologies: ["Waterfall", "Risk Management", "Quality Assurance"],
        key_milestones: [
          {
            milestone: "Data Assessment Complete",
            date: "2023-05-15",
            status: "Completed"
          },
          {
            milestone: "Migration Strategy Approved",
            date: "2023-07-01",
            status: "Completed"
          },
          {
            milestone: "Pilot Migration Success",
            date: "2023-11-30",
            status: "Completed"
          },
          {
            milestone: "Full Migration Complete",
            date: "2024-04-15",
            status: "Completed"
          }
        ]
      }
    ];

    res.status(200).json(projects);
  } catch (error) {
    console.error('Projects API Error:', error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
}