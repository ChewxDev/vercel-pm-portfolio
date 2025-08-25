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

async function createProjectDatabases() {
    console.log("Creating AI Chatbot Project workspace...");

    // 1. Project Overview Database
    const projectOverview = await notion.databases.create({
        parent: { type: "page_id", page_id: NOTION_PAGE_ID },
        title: [{ type: "text", text: { content: "Project Overview" } }],
        properties: {
            "Metric": { title: {} },
            "Current Value": { rich_text: {} },
            "Target Value": { rich_text: {} },
            "Status": {
                select: {
                    options: [
                        { name: "On Track", color: "green" },
                        { name: "At Risk", color: "yellow" },
                        { name: "Behind", color: "red" },
                        { name: "Complete", color: "blue" }
                    ]
                }
            },
            "Notes": { rich_text: {} }
        }
    });

    // 2. Task Management Database
    const taskDatabase = await notion.databases.create({
        parent: { type: "page_id", page_id: NOTION_PAGE_ID },
        title: [{ type: "text", text: { content: "Task Management" } }],
        properties: {
            "Task": { title: {} },
            "Assignee": {
                select: {
                    options: [
                        { name: "Nicholas Njoku (PM)", color: "blue" },
                        { name: "Sarah Chen (AI Engineer)", color: "purple" },
                        { name: "Mike Johnson (AI Engineer)", color: "purple" },
                        { name: "Lisa Wong (Frontend Dev)", color: "green" },
                        { name: "David Kim (Frontend Dev)", color: "green" },
                        { name: "Alex Rodriguez (Backend Dev)", color: "orange" },
                        { name: "Emma Thompson (QA)", color: "pink" },
                        { name: "John Miller (Designer)", color: "yellow" }
                    ]
                }
            },
            "Sprint": {
                select: {
                    options: [
                        { name: "Sprint 1: Research & Planning", color: "blue" },
                        { name: "Sprint 2: AI Model Development", color: "purple" },
                        { name: "Sprint 3: Integration & UI", color: "green" },
                        { name: "Sprint 4: Testing & Deployment", color: "orange" }
                    ]
                }
            },
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
                        { name: "To Do", color: "gray" },
                        { name: "In Progress", color: "yellow" },
                        { name: "Review", color: "orange" },
                        { name: "Done", color: "green" },
                        { name: "Blocked", color: "red" }
                    ]
                }
            },
            "Story Points": { number: {} },
            "Start Date": { date: {} },
            "Due Date": { date: {} },
            "Description": { rich_text: {} }
        }
    });

    // 3. Risk Management Database
    const riskDatabase = await notion.databases.create({
        parent: { type: "page_id", page_id: NOTION_PAGE_ID },
        title: [{ type: "text", text: { content: "Risk Management" } }],
        properties: {
            "Risk": { title: {} },
            "Category": {
                select: {
                    options: [
                        { name: "Technical", color: "purple" },
                        { name: "Resource", color: "orange" },
                        { name: "Timeline", color: "red" },
                        { name: "Budget", color: "yellow" },
                        { name: "Quality", color: "blue" },
                        { name: "Stakeholder", color: "green" }
                    ]
                }
            },
            "Probability": {
                select: {
                    options: [
                        { name: "Low (1-3)", color: "green" },
                        { name: "Medium (4-6)", color: "yellow" },
                        { name: "High (7-9)", color: "red" }
                    ]
                }
            },
            "Impact": {
                select: {
                    options: [
                        { name: "Low (1-3)", color: "green" },
                        { name: "Medium (4-6)", color: "yellow" },
                        { name: "High (7-9)", color: "red" }
                    ]
                }
            },
            "Risk Score": { number: {} },
            "Mitigation Strategy": { rich_text: {} },
            "Owner": {
                select: {
                    options: [
                        { name: "Nicholas Njoku (PM)", color: "blue" },
                        { name: "Sarah Chen (AI Engineer)", color: "purple" },
                        { name: "Alex Rodriguez (Backend Dev)", color: "orange" }
                    ]
                }
            },
            "Status": {
                select: {
                    options: [
                        { name: "Active", color: "red" },
                        { name: "Monitoring", color: "yellow" },
                        { name: "Mitigated", color: "green" },
                        { name: "Closed", color: "gray" }
                    ]
                }
            }
        }
    });

    // 4. Stakeholder Communication Database
    const stakeholderDatabase = await notion.databases.create({
        parent: { type: "page_id", page_id: NOTION_PAGE_ID },
        title: [{ type: "text", text: { content: "Stakeholder Communication" } }],
        properties: {
            "Meeting/Communication": { title: {} },
            "Date": { date: {} },
            "Type": {
                select: {
                    options: [
                        { name: "Sprint Planning", color: "blue" },
                        { name: "Daily Standup", color: "green" },
                        { name: "Sprint Review", color: "purple" },
                        { name: "Stakeholder Update", color: "orange" },
                        { name: "Risk Review", color: "red" },
                        { name: "Technical Review", color: "yellow" }
                    ]
                }
            },
            "Attendees": { rich_text: {} },
            "Key Decisions": { rich_text: {} },
            "Action Items": { rich_text: {} },
            "Next Steps": { rich_text: {} }
        }
    });

    // 5. Budget & Resources Database
    const budgetDatabase = await notion.databases.create({
        parent: { type: "page_id", page_id: NOTION_PAGE_ID },
        title: [{ type: "text", text: { content: "Budget & Resources" } }],
        properties: {
            "Category": { title: {} },
            "Budgeted Amount": { number: {} },
            "Actual Spend": { number: {} },
            "Remaining": { number: {} },
            "Variance %": { number: {} },
            "Status": {
                select: {
                    options: [
                        { name: "Under Budget", color: "green" },
                        { name: "On Budget", color: "blue" },
                        { name: "Over Budget", color: "red" }
                    ]
                }
            },
            "Notes": { rich_text: {} }
        }
    });

    return {
        projectOverview: projectOverview.id,
        taskDatabase: taskDatabase.id,
        riskDatabase: riskDatabase.id,
        stakeholderDatabase: stakeholderDatabase.id,
        budgetDatabase: budgetDatabase.id
    };
}

async function populateProjectData(databases: any) {
    console.log("Populating project data...");

    // Project Overview Data
    const overviewData = [
        { metric: "Project Progress", current: "75%", target: "100%", status: "On Track", notes: "Sprint 3 in progress, on schedule for Q2 delivery" },
        { metric: "Budget Utilization", current: "$56,250", target: "$75,000", status: "On Track", notes: "75% budget consumed, aligned with timeline" },
        { metric: "Team Velocity", current: "32 points", target: "30 points", status: "On Track", notes: "Team exceeding velocity targets consistently" },
        { metric: "Customer Satisfaction", current: "4.2/5", target: "4.0/5", status: "On Track", notes: "Early user feedback very positive" },
        { metric: "Ticket Reduction", current: "45%", target: "60%", status: "On Track", notes: "Already seeing significant impact in pilot" }
    ];

    for (const item of overviewData) {
        await notion.pages.create({
            parent: { database_id: databases.projectOverview },
            properties: {
                "Metric": { title: [{ text: { content: item.metric } }] },
                "Current Value": { rich_text: [{ text: { content: item.current } }] },
                "Target Value": { rich_text: [{ text: { content: item.target } }] },
                "Status": { select: { name: item.status } },
                "Notes": { rich_text: [{ text: { content: item.notes } }] }
            }
        });
    }

    // Task Data
    const taskData = [
        {
            task: "Conduct user research and requirements gathering",
            assignee: "Nicholas Njoku (PM)",
            sprint: "Sprint 1: Research & Planning",
            priority: "Critical",
            status: "Done",
            points: 8,
            description: "Interview 20 customers, analyze current support tickets, define chatbot requirements"
        },
        {
            task: "Design chatbot conversation flows and intents",
            assignee: "John Miller (Designer)",
            sprint: "Sprint 1: Research & Planning", 
            priority: "High",
            status: "Done",
            points: 5,
            description: "Create conversation maps, design user interaction flows, define intent structure"
        },
        {
            task: "Set up AI model training infrastructure",
            assignee: "Sarah Chen (AI Engineer)",
            sprint: "Sprint 2: AI Model Development",
            priority: "Critical",
            status: "Done",
            points: 13,
            description: "Configure cloud infrastructure, set up training pipelines, prepare data preprocessing"
        },
        {
            task: "Train and fine-tune NLP model for customer support",
            assignee: "Mike Johnson (AI Engineer)",
            sprint: "Sprint 2: AI Model Development",
            priority: "Critical", 
            status: "Done",
            points: 21,
            description: "Train base model on support data, fine-tune for company-specific terminology"
        },
        {
            task: "Develop chatbot backend API integration",
            assignee: "Alex Rodriguez (Backend Dev)",
            sprint: "Sprint 3: Integration & UI",
            priority: "High",
            status: "In Progress",
            points: 8,
            description: "Create REST APIs, integrate with AI model, implement session management"
        },
        {
            task: "Build chatbot frontend interface",
            assignee: "Lisa Wong (Frontend Dev)",
            sprint: "Sprint 3: Integration & UI",
            priority: "High",
            status: "In Progress",
            points: 13,
            description: "Develop chat widget, implement responsive design, add typing indicators"
        },
        {
            task: "Implement chatbot analytics dashboard",
            assignee: "David Kim (Frontend Dev)",
            sprint: "Sprint 3: Integration & UI",
            priority: "Medium",
            status: "To Do",
            points: 8,
            description: "Create admin dashboard for monitoring conversations, user satisfaction, performance metrics"
        },
        {
            task: "Conduct comprehensive testing and QA",
            assignee: "Emma Thompson (QA)",
            sprint: "Sprint 4: Testing & Deployment",
            priority: "Critical",
            status: "To Do",
            points: 13,
            description: "Test conversation accuracy, load testing, security testing, user acceptance testing"
        },
        {
            task: "Deploy to production environment",
            assignee: "Alex Rodriguez (Backend Dev)",
            sprint: "Sprint 4: Testing & Deployment",
            priority: "Critical",
            status: "To Do",
            points: 5,
            description: "Production deployment, monitoring setup, rollback procedures"
        },
        {
            task: "Staff training and change management",
            assignee: "Nicholas Njoku (PM)",
            sprint: "Sprint 4: Testing & Deployment",
            priority: "High",
            status: "To Do",
            points: 8,
            description: "Train support staff on chatbot management, create documentation, manage change process"
        }
    ];

    for (const task of taskData) {
        await notion.pages.create({
            parent: { database_id: databases.taskDatabase },
            properties: {
                "Task": { title: [{ text: { content: task.task } }] },
                "Assignee": { select: { name: task.assignee } },
                "Sprint": { select: { name: task.sprint } },
                "Priority": { select: { name: task.priority } },
                "Status": { select: { name: task.status } },
                "Story Points": { number: task.points },
                "Description": { rich_text: [{ text: { content: task.description } }] }
            }
        });
    }

    // Risk Data
    const riskData = [
        {
            risk: "AI model accuracy below acceptable threshold",
            category: "Technical",
            probability: "Medium (4-6)",
            impact: "High (7-9)",
            score: 6,
            mitigation: "Continuous model training, implement feedback loop, human escalation for complex queries",
            owner: "Sarah Chen (AI Engineer)",
            status: "Monitoring"
        },
        {
            risk: "Integration complexity with existing systems",
            category: "Technical", 
            probability: "Medium (4-6)",
            impact: "Medium (4-6)",
            score: 5,
            mitigation: "Early API testing, phased integration approach, dedicated integration specialist",
            owner: "Alex Rodriguez (Backend Dev)",
            status: "Mitigated"
        },
        {
            risk: "User adoption resistance from support team",
            category: "Stakeholder",
            probability: "Low (1-3)",
            impact: "Medium (4-6)",
            score: 3,
            mitigation: "Change management plan, comprehensive training, highlight efficiency benefits",
            owner: "Nicholas Njoku (PM)",
            status: "Mitigated"
        },
        {
            risk: "Budget overrun due to extended training requirements",
            category: "Budget",
            probability: "Low (1-3)",
            impact: "Medium (4-6)",
            score: 3,
            mitigation: "Regular budget reviews, approved change control process, contingency planning",
            owner: "Nicholas Njoku (PM)",
            status: "Monitoring"
        },
        {
            risk: "Data privacy and security compliance issues",
            category: "Quality",
            probability: "Low (1-3)",
            impact: "High (7-9)",
            score: 4,
            mitigation: "Security audit, GDPR compliance review, data encryption implementation",
            owner: "Alex Rodriguez (Backend Dev)",
            status: "Active"
        }
    ];

    for (const risk of riskData) {
        await notion.pages.create({
            parent: { database_id: databases.riskDatabase },
            properties: {
                "Risk": { title: [{ text: { content: risk.risk } }] },
                "Category": { select: { name: risk.category } },
                "Probability": { select: { name: risk.probability } },
                "Impact": { select: { name: risk.impact } },
                "Risk Score": { number: risk.score },
                "Mitigation Strategy": { rich_text: [{ text: { content: risk.mitigation } }] },
                "Owner": { select: { name: risk.owner } },
                "Status": { select: { name: risk.status } }
            }
        });
    }

    // Stakeholder Communication Data
    const commData = [
        {
            meeting: "Project Kickoff Meeting",
            date: "2024-01-15",
            type: "Stakeholder Update",
            attendees: "Nicholas Njoku, Sarah Chen, John Miller, Product Manager, CTO",
            decisions: "Approved project scope, timeline, and budget. Confirmed AI model approach and integration strategy.",
            actions: "Nicholas to finalize team assignments, Sarah to begin infrastructure setup, John to start design research",
            next: "Sprint 1 planning session scheduled for January 22nd"
        },
        {
            meeting: "Sprint 1 Planning",
            date: "2024-01-22",
            type: "Sprint Planning",
            attendees: "Full development team",
            decisions: "Sprint 1 scope finalized: user research, requirements, and design. 2-week sprint duration confirmed.",
            actions: "Begin user interviews, set up development environments, create initial design mockups",
            next: "Daily standups starting January 23rd, Sprint 1 review on February 5th"
        },
        {
            meeting: "Sprint 1 Review & Retrospective",
            date: "2024-02-05",
            type: "Sprint Review",
            attendees: "Development team + stakeholders",
            decisions: "Requirements approved, design concepts validated. Ready to proceed with Sprint 2.",
            actions: "Refine user stories based on feedback, prepare Sprint 2 backlog, begin AI infrastructure work",
            next: "Sprint 2 planning on February 6th"
        },
        {
            meeting: "AI Model Training Progress Review",
            date: "2024-02-26",
            type: "Technical Review",
            attendees: "Nicholas, Sarah, Mike, CTO",
            decisions: "Model accuracy at 85%, approved for integration testing. Additional training data approved.",
            actions: "Continue model refinement, begin API development, prepare integration testing environment",
            next: "Sprint 3 planning and integration kickoff"
        },
        {
            meeting: "Sprint 3 Mid-Sprint Check-in",
            date: "2024-03-18",
            type: "Stakeholder Update",
            attendees: "Project team + Product Manager",
            decisions: "Integration progressing well, UI design approved. Demo scheduled for stakeholders.",
            actions: "Complete API integration, finalize UI components, prepare demo environment",
            next: "Stakeholder demo on March 25th, Sprint 4 planning"
        }
    ];

    for (const comm of commData) {
        await notion.pages.create({
            parent: { database_id: databases.stakeholderDatabase },
            properties: {
                "Meeting/Communication": { title: [{ text: { content: comm.meeting } }] },
                "Date": { date: { start: comm.date } },
                "Type": { select: { name: comm.type } },
                "Attendees": { rich_text: [{ text: { content: comm.attendees } }] },
                "Key Decisions": { rich_text: [{ text: { content: comm.decisions } }] },
                "Action Items": { rich_text: [{ text: { content: comm.actions } }] },
                "Next Steps": { rich_text: [{ text: { content: comm.next } }] }
            }
        });
    }

    // Budget Data
    const budgetData = [
        { category: "Personnel (4 months)", budgeted: 48000, actual: 36000, remaining: 12000, variance: -25, status: "Under Budget", notes: "Team ramped up gradually, savings from efficient delivery" },
        { category: "AI/ML Infrastructure", budgeted: 12000, actual: 9500, remaining: 2500, variance: -21, status: "Under Budget", notes: "Optimized cloud usage, efficient model training" },
        { category: "Development Tools & Software", budgeted: 8000, actual: 6200, remaining: 1800, variance: -23, status: "Under Budget", notes: "Leveraged existing licenses, open source tools" },
        { category: "Training & Certification", budgeted: 4000, actual: 2800, remaining: 1200, variance: -30, status: "Under Budget", notes: "Internal knowledge sharing reduced external training needs" },
        { category: "Testing & QA", budgeted: 3000, actual: 1750, remaining: 1250, variance: -42, status: "Under Budget", notes: "Automated testing tools, efficient QA processes" }
    ];

    for (const budget of budgetData) {
        await notion.pages.create({
            parent: { database_id: databases.budgetDatabase },
            properties: {
                "Category": { title: [{ text: { content: budget.category } }] },
                "Budgeted Amount": { number: budget.budgeted },
                "Actual Spend": { number: budget.actual },
                "Remaining": { number: budget.remaining },
                "Variance %": { number: budget.variance },
                "Status": { select: { name: budget.status } },
                "Notes": { rich_text: [{ text: { content: budget.notes } }] }
            }
        });
    }

    console.log("✅ AI Chatbot Project workspace created successfully!");
}

// Run the setup
async function setupProject() {
    try {
        const databases = await createProjectDatabases();
        await populateProjectData(databases);
        
        // Add project summary to the main page
        await notion.blocks.children.append({
            block_id: NOTION_PAGE_ID,
            children: [
                {
                    type: "heading_1",
                    heading_1: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "AI Customer Support Chatbot - Lean Geeks" } 
                        }]
                    }
                },
                {
                    type: "paragraph",
                    paragraph: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "Project Manager: Nicholas Njoku | Duration: 4 months | Budget: $75,000 | Team: 8 members" } 
                        }]
                    }
                },
                {
                    type: "heading_2",
                    heading_2: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "Project Objective" } 
                        }]
                    }
                },
                {
                    type: "paragraph",
                    paragraph: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "Deploy an intelligent AI chatbot to handle Level 1 customer support inquiries, reducing ticket volume by 60% and improving customer response times from 24 hours to under 5 minutes." } 
                        }]
                    }
                },
                {
                    type: "heading_2",
                    heading_2: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "Key Success Metrics" } 
                        }]
                    }
                },
                {
                    type: "bulleted_list_item",
                    bulleted_list_item: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "60% reduction in manual support tickets" } 
                        }]
                    }
                },
                {
                    type: "bulleted_list_item",
                    bulleted_list_item: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "85%+ chatbot accuracy rate" } 
                        }]
                    }
                },
                {
                    type: "bulleted_list_item",
                    bulleted_list_item: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "4.0+ customer satisfaction score" } 
                        }]
                    }
                },
                {
                    type: "bulleted_list_item",
                    bulleted_list_item: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "Under 5-minute average response time" } 
                        }]
                    }
                },
                {
                    type: "heading_2",
                    heading_2: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "Project Management Databases" } 
                        }]
                    }
                },
                {
                    type: "paragraph",
                    paragraph: {
                        rich_text: [{ 
                            type: "text", 
                            text: { content: "The following databases contain comprehensive project management documentation and tracking:" } 
                        }]
                    }
                }
            ]
        });

        console.log("Project setup completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error setting up project:", error);
        process.exit(1);
    }
}

setupProject();