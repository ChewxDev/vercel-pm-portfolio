import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";

// Simple version to test if animations are causing crashes
export default function ProjectsSection() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600">
              Error loading projects: {String(error)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div>No projects available.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Project Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed case studies showcasing my project management expertise and
            measurable business impact
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6">{project.description}</p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {project.metrics?.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {metric.description}
                      </div>
                    </div>
                  )) || []}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Responsibilities
                    </h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      {project.responsibilities?.map(
                        (responsibility, respIndex) => (
                          <li key={respIndex}>• {responsibility}</li>
                        )
                      ) || []}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Key Achievements
                    </h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      {project.achievements?.map((achievement, achIndex) => (
                        <li key={achIndex}>• {achievement}</li>
                      )) || []}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Skills Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills?.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    )) || []}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
