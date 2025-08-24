// Vercel API function for resources endpoint
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
    // Static resources data for portfolio
    const resources = [
      {
        id: "1",
        title: "Project Planning Template",
        description: "Comprehensive project planning template with Gantt charts, resource allocation, and milestone tracking. Perfect for medium to large-scale projects.",
        category: "Templates",
        file_type: "DOCX",
        file_size: "2.1 MB",
        google_drive_url: "https://drive.google.com/drive/folders/1BxwM9h2KQpjYr3_4Lm8Zx7qN9vCdF2g",
        preview_available: true,
        tags: ["Planning", "Templates", "Gantt", "Milestones"]
      },
      {
        id: "2", 
        title: "Risk Assessment Matrix",
        description: "Ready-to-use risk assessment matrix with probability-impact scoring, mitigation strategies, and monitoring frameworks.",
        category: "Risk Management",
        file_type: "CSV", 
        file_size: "156 KB",
        google_drive_url: "https://drive.google.com/drive/folders/1BxwM9h2KQpjYr3_4Lm8Zx7qN9vCdF2g",
        preview_available: false,
        tags: ["Risk", "Assessment", "Matrix", "Mitigation"]
      },
      {
        id: "3",
        title: "Stakeholder Communication Plan",
        description: "Structured template for managing stakeholder communications throughout the project lifecycle, including escalation procedures.",
        category: "Communication",
        file_type: "DOCX",
        file_size: "1.8 MB", 
        google_drive_url: "https://drive.google.com/drive/folders/1BxwM9h2KQpjYr3_4Lm8Zx7qN9vCdF2g",
        preview_available: true,
        tags: ["Communication", "Stakeholders", "Planning", "Templates"]
      },
      {
        id: "4",
        title: "Team Performance Dashboard",
        description: "Excel-based dashboard for tracking team performance metrics, productivity indicators, and project KPIs with automated charts.",
        category: "Analytics",
        file_type: "XLSX",
        file_size: "3.2 MB",
        google_drive_url: "https://drive.google.com/drive/folders/1BxwM9h2KQpjYr3_4Lm8Zx7qN9vCdF2g", 
        preview_available: false,
        tags: ["Analytics", "Performance", "KPIs", "Dashboard"]
      },
      {
        id: "5",
        title: "Project Closure Report Template",
        description: "Comprehensive template for documenting project outcomes, lessons learned, and post-implementation review processes.",
        category: "Templates",
        file_type: "DOCX",
        file_size: "1.5 MB",
        google_drive_url: "https://drive.google.com/drive/folders/1BxwM9h2KQpjYr3_4Lm8Zx7qN9vCdF2g",
        preview_available: true,
        tags: ["Closure", "Documentation", "Lessons Learned", "Templates"]
      },
      {
        id: "6",
        title: "Process Improvement Checklist",
        description: "Step-by-step checklist for identifying process improvement opportunities and implementing sustainable changes.",
        category: "Process Improvement",
        file_type: "DOCX",
        file_size: "892 KB",
        google_drive_url: "https://drive.google.com/drive/folders/1BxwM9h2KQpjYr3_4Lm8Zx7qN9vCdF2g",
        preview_available: true,
        tags: ["Process", "Improvement", "Checklist", "Optimization"]
      }
    ];

    res.status(200).json(resources);
  } catch (error) {
    console.error('Resources API Error:', error);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
}