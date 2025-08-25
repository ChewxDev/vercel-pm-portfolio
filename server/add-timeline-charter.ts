import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_INTEGRATION_SECRET!,
});

// Extract the page ID from the Notion page URL
function extractPageIdFromUrl(pageUrl: string): string {
    const match = pageUrl.match(/([a-f0-9]{32})(?:[?#]|$)/i);
    if (match && match[1]) {
        return match[1];
    }
    throw Error("Failed to extract page ID");
}

const NOTION_PAGE_ID = extractPageIdFromUrl(process.env.NOTION_PAGE_URL!);

async function addTimelineAndCharter() {
    console.log("Adding Project Timeline and Project Charter...");

    // 1. Create Project Timeline Database
    const timelineDatabase = await notion.databases.create({
        parent: { type: "page_id", page_id: NOTION_PAGE_ID },
        title: [{ type: "text", text: { content: "Project Timeline & Milestones" } }],
        properties: {
            "Phase/Milestone": { title: {} },
            "Type": {
                select: {
                    options: [
                        { name: "Phase", color: "blue" },
                        { name: "Milestone", color: "green" },
                        { name: "Deliverable", color: "purple" },
                        { name: "Gate Review", color: "orange" }
                    ]
                }
            },
            "Start Date": { date: {} },
            "End Date": { date: {} },
            "Duration (Days)": { number: {} },
            "Dependencies": { rich_text: {} },
            "Owner": {
                select: {
                    options: [
                        { name: "Nicholas Njoku (PM)", color: "blue" },
                        { name: "Sarah Chen (AI Engineer)", color: "purple" },
                        { name: "Mike Johnson (AI Engineer)", color: "purple" },
                        { name: "Lisa Wong (Frontend Dev)", color: "green" },
                        { name: "Alex Rodriguez (Backend Dev)", color: "orange" },
                        { name: "Emma Thompson (QA)", color: "pink" },
                        { name: "John Miller (Designer)", color: "yellow" },
                        { name: "Product Team", color: "gray" }
                    ]
                }
            },
            "Status": {
                select: {
                    options: [
                        { name: "Not Started", color: "gray" },
                        { name: "In Progress", color: "yellow" },
                        { name: "Completed", color: "green" },
                        { name: "At Risk", color: "red" }
                    ]
                }
            },
            "Completion %": { number: {} },
            "Notes": { rich_text: {} }
        }
    });

    // 2. Create Project Charter Database
    const charterDatabase = await notion.databases.create({
        parent: { type: "page_id", page_id: NOTION_PAGE_ID },
        title: [{ type: "text", text: { content: "Project Charter Elements" } }],
        properties: {
            "Charter Element": { title: {} },
            "Category": {
                select: {
                    options: [
                        { name: "Project Definition", color: "blue" },
                        { name: "Scope & Objectives", color: "green" },
                        { name: "Stakeholders", color: "purple" },
                        { name: "Success Criteria", color: "orange" },
                        { name: "Constraints & Assumptions", color: "red" },
                        { name: "Risk & Dependencies", color: "yellow" }
                    ]
                }
            },
            "Description": { rich_text: {} },
            "Priority": {
                select: {
                    options: [
                        { name: "Critical", color: "red" },
                        { name: "High", color: "orange" },
                        { name: "Medium", color: "yellow" },
                        { name: "Low", color: "gray" }
                    ]
                }
            },
            "Status": {
                select: {
                    options: [
                        { name: "Approved", color: "green" },
                        { name: "Under Review", color: "yellow" },
                        { name: "Draft", color: "gray" }
                    ]
                }
            }
        }
    });

    // Populate Timeline Data
    const timelineData = [
        {
            item: "Project Initiation",
            type: "Phase",
            start: "2024-01-08",
            end: "2024-01-19",
            duration: 10,
            dependencies: "Executive Approval",
            owner: "Nicholas Njoku (PM)",
            status: "Completed",
            completion: 100,
            notes: "Project kickoff, team assembly, initial planning"
        },
        {
            item: "Project Kickoff Meeting",
            type: "Milestone", 
            start: "2024-01-15",
            end: "2024-01-15",
            duration: 1,
            dependencies: "Team Availability",
            owner: "Nicholas Njoku (PM)",
            status: "Completed",
            completion: 100,
            notes: "All stakeholders aligned on objectives and approach"
        },
        {
            item: "Research & Requirements Phase",
            type: "Phase",
            start: "2024-01-22",
            end: "2024-02-09",
            duration: 15,
            dependencies: "Project Initiation Complete",
            owner: "Nicholas Njoku (PM)",
            status: "Completed",
            completion: 100,
            notes: "User research, requirements gathering, design planning"
        },
        {
            item: "Requirements Document",
            type: "Deliverable",
            start: "2024-02-05",
            end: "2024-02-09",
            duration: 4,
            dependencies: "User Research Complete",
            owner: "Nicholas Njoku (PM)",
            status: "Completed",
            completion: 100,
            notes: "Comprehensive requirements document with user stories"
        },
        {
            item: "Phase 1 Gate Review",
            type: "Gate Review",
            start: "2024-02-12",
            end: "2024-02-12",
            duration: 1,
            dependencies: "Requirements Approval",
            owner: "Product Team",
            status: "Completed",
            completion: 100,
            notes: "Requirements approved, proceed to development"
        },
        {
            item: "AI Model Development Phase",
            type: "Phase",
            start: "2024-02-13",
            end: "2024-03-08",
            duration: 20,
            dependencies: "Requirements Approval",
            owner: "Sarah Chen (AI Engineer)",
            status: "Completed",
            completion: 100,
            notes: "Model training, testing, optimization"
        },
        {
            item: "AI Model Training Complete",
            type: "Milestone",
            start: "2024-02-28",
            end: "2024-02-28",
            duration: 1,
            dependencies: "Training Data Prepared",
            owner: "Mike Johnson (AI Engineer)",
            status: "Completed",
            completion: 100,
            notes: "Model achieving 85% accuracy on test data"
        },
        {
            item: "Integration & UI Development Phase",
            type: "Phase",
            start: "2024-03-11",
            end: "2024-04-05",
            duration: 20,
            dependencies: "AI Model Complete",
            owner: "Alex Rodriguez (Backend Dev)",
            status: "In Progress",
            completion: 75,
            notes: "Backend integration, frontend development, API creation"
        },
        {
            item: "API Integration Complete",
            type: "Milestone",
            start: "2024-03-25",
            end: "2024-03-25",
            duration: 1,
            dependencies: "Backend Development",
            owner: "Alex Rodriguez (Backend Dev)",
            status: "In Progress",
            completion: 80,
            notes: "APIs functional, ready for frontend integration"
        },
        {
            item: "UI Development Complete",
            type: "Deliverable",
            start: "2024-03-28",
            end: "2024-04-05",
            duration: 6,
            dependencies: "API Integration",
            owner: "Lisa Wong (Frontend Dev)",
            status: "In Progress",
            completion: 60,
            notes: "Chat interface, admin dashboard, responsive design"
        },
        {
            item: "Phase 2 Gate Review",
            type: "Gate Review",
            start: "2024-04-08",
            end: "2024-04-08",
            duration: 1,
            dependencies: "Integration Complete",
            owner: "Product Team",
            status: "Not Started",
            completion: 0,
            notes: "Review integration quality, approve for testing"
        },
        {
            item: "Testing & Quality Assurance Phase",
            type: "Phase",
            start: "2024-04-09",
            end: "2024-04-26",
            duration: 15,
            dependencies: "Integration Complete",
            owner: "Emma Thompson (QA)",
            status: "Not Started",
            completion: 0,
            notes: "Comprehensive testing, user acceptance, performance testing"
        },
        {
            item: "User Acceptance Testing Complete",
            type: "Milestone",
            start: "2024-04-22",
            end: "2024-04-22",
            duration: 1,
            dependencies: "System Testing Complete",
            owner: "Emma Thompson (QA)",
            status: "Not Started",
            completion: 0,
            notes: "User feedback incorporated, system approved for deployment"
        },
        {
            item: "Production Deployment",
            type: "Phase",
            start: "2024-04-29",
            end: "2024-05-10",
            duration: 10,
            dependencies: "UAT Complete",
            owner: "Alex Rodriguez (Backend Dev)",
            status: "Not Started",
            completion: 0,
            notes: "Production deployment, monitoring, staff training"
        },
        {
            item: "Go-Live Milestone",
            type: "Milestone",
            start: "2024-05-06",
            end: "2024-05-06",
            duration: 1,
            dependencies: "Deployment Complete",
            owner: "Nicholas Njoku (PM)",
            status: "Not Started",
            completion: 0,
            notes: "System live, customers can access chatbot"
        },
        {
            item: "Project Closure & Handover",
            type: "Phase",
            start: "2024-05-13",
            end: "2024-05-24",
            duration: 10,
            dependencies: "Go-Live Complete",
            owner: "Nicholas Njoku (PM)",
            status: "Not Started",
            completion: 0,
            notes: "Documentation, knowledge transfer, lessons learned"
        }
    ];

    for (const item of timelineData) {
        await notion.pages.create({
            parent: { database_id: timelineDatabase.id },
            properties: {
                "Phase/Milestone": { title: [{ text: { content: item.item } }] },
                "Type": { select: { name: item.type } },
                "Start Date": { date: { start: item.start } },
                "End Date": { date: { start: item.end } },
                "Duration (Days)": { number: item.duration },
                "Dependencies": { rich_text: [{ text: { content: item.dependencies } }] },
                "Owner": { select: { name: item.owner } },
                "Status": { select: { name: item.status } },
                "Completion %": { number: item.completion },
                "Notes": { rich_text: [{ text: { content: item.notes } }] }
            }
        });
    }

    // Populate Charter Data
    const charterData = [
        {
            element: "Project Title",
            category: "Project Definition",
            description: "AI Customer Support Chatbot Implementation for Lean Geeks",
            priority: "Critical",
            status: "Approved"
        },
        {
            element: "Project Purpose & Justification",
            category: "Project Definition",
            description: "Reduce customer support workload by 60% through intelligent automation, improving response times from 24 hours to under 5 minutes while maintaining high customer satisfaction.",
            priority: "Critical",
            status: "Approved"
        },
        {
            element: "Project Manager Assignment",
            category: "Project Definition",
            description: "Nicholas Njoku appointed as Project Manager with full authority for project execution, resource allocation, and stakeholder management.",
            priority: "Critical",
            status: "Approved"
        },
        {
            element: "High-Level Project Description",
            category: "Scope & Objectives",
            description: "Develop and deploy an AI-powered chatbot using NLP and machine learning to handle Level 1 customer support inquiries, integrated with existing customer support systems.",
            priority: "Critical",
            status: "Approved"
        },
        {
            element: "Project Objectives",
            category: "Scope & Objectives",
            description: "1) Achieve 85%+ chatbot accuracy rate, 2) Reduce support tickets by 60%, 3) Improve response time to <5 minutes, 4) Maintain 4.0+ customer satisfaction score, 5) Deploy within $75K budget",
            priority: "Critical",
            status: "Approved"
        },
        {
            element: "Project Scope",
            category: "Scope & Objectives",
            description: "INCLUDED: AI model development, chatbot interface, admin dashboard, API integration, testing, deployment, staff training. EXCLUDED: Advanced analytics, multilingual support, voice integration.",
            priority: "High",
            status: "Approved"
        },
        {
            element: "Key Deliverables",
            category: "Scope & Objectives",
            description: "1) Trained AI model (85%+ accuracy), 2) Customer-facing chat interface, 3) Admin management dashboard, 4) API integration, 5) Documentation & training materials, 6) Deployed production system",
            priority: "High",
            status: "Approved"
        },
        {
            element: "Project Sponsor",
            category: "Stakeholders",
            description: "Chief Technology Officer - Primary sponsor providing executive support, budget approval, and strategic guidance for the chatbot implementation.",
            priority: "Critical",
            status: "Approved"
        },
        {
            element: "Key Stakeholders",
            category: "Stakeholders",
            description: "CTO (Sponsor), Product Manager (Business Owner), Customer Support Manager (End User), Development Team (Execution), Customers (Beneficiaries), IT Security (Compliance)",
            priority: "High",
            status: "Approved"
        },
        {
            element: "Project Team Structure",
            category: "Stakeholders",
            description: "Nicholas Njoku (PM), Sarah Chen & Mike Johnson (AI Engineers), Lisa Wong & David Kim (Frontend), Alex Rodriguez (Backend), Emma Thompson (QA), John Miller (Designer) - 8 total members",
            priority: "High",
            status: "Approved"
        },
        {
            element: "Success Criteria - Technical",
            category: "Success Criteria",
            description: "AI model accuracy ≥85%, System uptime ≥99.5%, Response time <5 seconds, Successful integration with existing systems, Zero security vulnerabilities",
            priority: "Critical",
            status: "Approved"
        },
        {
            element: "Success Criteria - Business",
            category: "Success Criteria",
            description: "60% reduction in Level 1 support tickets, Customer satisfaction ≥4.0/5, Support team efficiency improvement ≥25%, Project completion within budget and timeline",
            priority: "Critical",
            status: "Approved"
        },
        {
            element: "Budget Constraints",
            category: "Constraints & Assumptions",
            description: "Total project budget: $75,000 (Personnel: $48K, Infrastructure: $12K, Tools: $8K, Training: $4K, Testing: $3K). No budget contingency approved.",
            priority: "High",
            status: "Approved"
        },
        {
            element: "Timeline Constraints",
            category: "Constraints & Assumptions",
            description: "Project must be completed within 4 months (January 8 - May 24, 2024). Go-live date fixed for May 6, 2024 to align with business requirements.",
            priority: "High",
            status: "Approved"
        },
        {
            element: "Resource Constraints",
            category: "Constraints & Assumptions",
            description: "Development team availability limited to committed resources. AI expertise limited to 2 engineers. QA capacity shared with other projects during final sprint.",
            priority: "Medium",
            status: "Approved"
        },
        {
            element: "Key Assumptions",
            category: "Constraints & Assumptions",
            description: "1) Customer support data quality sufficient for training, 2) Existing systems APIs available for integration, 3) Staff available for training, 4) No major technical blockers, 5) Stakeholder availability for reviews",
            priority: "Medium",
            status: "Approved"
        },
        {
            element: "High-Level Risks",
            category: "Risk & Dependencies",
            description: "Technical: AI accuracy below threshold, Integration complexity. Business: User adoption resistance, Timeline delays. External: Data privacy compliance, Third-party service dependencies",
            priority: "High",
            status: "Approved"
        },
        {
            element: "Critical Dependencies",
            category: "Risk & Dependencies",
            description: "Executive approval for budget, Customer support team cooperation, IT infrastructure access, Data access permissions, Third-party AI service availability, Security team approval",
            priority: "High",
            status: "Approved"
        }
    ];

    for (const charter of charterData) {
        await notion.pages.create({
            parent: { database_id: charterDatabase.id },
            properties: {
                "Charter Element": { title: [{ text: { content: charter.element } }] },
                "Category": { select: { name: charter.category } },
                "Description": { rich_text: [{ text: { content: charter.description } }] },
                "Priority": { select: { name: charter.priority } },
                "Status": { select: { name: charter.status } }
            }
        });
    }

    console.log("✅ Project Timeline and Charter added successfully!");
}

// Run the setup
async function addDocuments() {
    try {
        await addTimelineAndCharter();
        console.log("Timeline and Charter setup completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error adding timeline and charter:", error);
        process.exit(1);
    }
}

addDocuments();