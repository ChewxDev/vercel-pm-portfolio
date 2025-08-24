export default function MethodologySection() {
  const methodologySteps = [
    {
      number: 1,
      title: "Project Initiation & Planning",
      description: "Comprehensive stakeholder analysis, scope definition, and resource allocation with clear success metrics."
    },
    {
      number: 2,
      title: "Team Formation & Communication",
      description: "Cross-functional team coordination with established communication protocols and regular progress reporting."
    },
    {
      number: 3,
      title: "Execution & Monitoring",
      description: "Agile execution with continuous monitoring, risk assessment, and adaptive management strategies."
    },
    {
      number: 4,
      title: "Quality Assurance & Delivery",
      description: "Systematic quality control, stakeholder validation, and seamless project delivery with comprehensive documentation."
    }
  ];

  const toolCategories = [
    {
      title: "Project Management",
      color: "primary",
      tools: ["Asana (Certified)", "Trello", "Notion", "Miro"]
    },
    {
      title: "Communication",
      color: "primary",
      tools: ["Slack", "Zoom", "Google Workspace", "Microsoft Office Suite"]
    },
    {
      title: "Analytics & CRM",
      color: "primary",
      tools: ["Salesforce", "HubSpot", "Zendesk", "Google Analytics"]
    },
    {
      title: "Development",
      color: "primary",
      tools: ["Express.js", "MongoDB", "Node.js", "Git Version Control"]
    }
  ];

  return (
    <section id="methodology" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="methodology-title">
            Project Management Methodology
          </h2>
          <p className="text-xl text-neutral max-w-3xl mx-auto" data-testid="methodology-description">
            My systematic approach to delivering successful projects across diverse industries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-8">
              {methodologySteps.map((step, index) => (
                <div key={index} className="flex items-start" data-testid={`methodology-step-${index}`}>
                  <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid={`methodology-step-title-${index}`}>
                      {step.title}
                    </h3>
                    <p className="text-neutral" data-testid={`methodology-step-description-${index}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6" data-testid="tools-title">Tools & Technologies</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {toolCategories.map((category, index) => (
                <div key={index} data-testid={`tool-category-${index}`}>
                  <h4 className="font-semibold mb-3 text-primary" data-testid={`tool-category-title-${index}`}>
                    {category.title}
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral">
                    {category.tools.map((tool, toolIndex) => (
                      <li key={toolIndex} className="flex items-center" data-testid={`tool-${index}-${toolIndex}`}>
                        <i className="fas fa-check text-secondary mr-2"></i>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
