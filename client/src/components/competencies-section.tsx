export default function CompetenciesSection() {
  const competencies = [
    {
      icon: "fas fa-tasks",
      title: "Project Planning & Execution",
      description: "Strategic project planning with cross-functional team coordination and stakeholder management",
      color: "primary"
    },
    {
      icon: "fas fa-chart-line",
      title: "Process Optimization",
      description: "Implementing systematic improvements that reduce costs and increase operational efficiency",
      color: "secondary"
    },
    {
      icon: "fas fa-users",
      title: "Team Leadership",
      description: "Leading diverse teams through training, mentoring, and performance management",
      color: "accent"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "secondary":
        return "bg-secondary/10 text-secondary";
      case "accent":
        return "bg-accent/10 text-accent";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="competencies-title">
            Core Project Management Competencies
          </h2>
          <p className="text-xl text-neutral max-w-3xl mx-auto" data-testid="competencies-description">
            Proven expertise across the full project lifecycle with measurable results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {competencies.map((competency, index) => (
            <div key={index} className="text-center p-6" data-testid={`competency-${index}`}>
              <div className={`${getColorClasses(competency.color)} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`${competency.icon} text-2xl`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-3" data-testid={`competency-title-${index}`}>
                {competency.title}
              </h3>
              <p className="text-neutral" data-testid={`competency-description-${index}`}>
                {competency.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
