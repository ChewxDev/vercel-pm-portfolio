import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { type Project } from "@shared/schema";

// Individual project card component to isolate hooks
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "from-primary to-blue-700";
      case "secondary":
        return "from-secondary to-green-700";
      case "purple":
        return "from-purple-600 to-purple-800";
      case "orange":
        return "from-orange-500 to-red-600";
      default:
        return "from-primary to-blue-700";
    }
  };

  const getMetricColor = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "purple":
        return "text-purple-600";
      case "orange":
        return "text-orange-500";
      default:
        return "text-primary";
    }
  };

  return (
    <motion.div
      className="mb-16"
      data-testid={`project-${index}`}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="md:flex">
          <div
            className={`md:w-1/3 p-8 bg-gradient-to-br ${getColorClasses(
              project.color
            )} text-white`}
          >
            <motion.div
              className="flex items-center mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            >
              <motion.i
                className={`${project.icon} text-2xl mr-3`}
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              />
              <h3
                className="text-2xl font-bold"
                data-testid={`project-title-${index}`}
              >
                {project.title}
              </h3>
            </motion.div>
            <div className="mb-6">
              <div className="text-sm opacity-80 mb-1">Company</div>
              <div
                className="font-semibold"
                data-testid={`project-company-${index}`}
              >
                {project.company}
              </div>
              <div
                className="text-sm opacity-80 mt-2"
                data-testid={`project-duration-${index}`}
              >
                Duration: {project.duration} | Team Size: {project.teamSize}
              </div>
            </div>
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
            >
              {project.skills.slice(0, 3).map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: index * 0.2 + 0.6 + skillIndex * 0.1,
                  }}
                >
                  <motion.i
                    className="fas fa-check-circle text-white/80 mr-2"
                    whileHover={{ scale: 1.2 }}
                  />
                  <span className="text-sm">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="md:w-2/3 p-8">
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            >
              {project.metrics.map((metric, metricIndex) => (
                <motion.div
                  key={metricIndex}
                  className="text-center"
                  data-testid={`project-metric-${index}-${metricIndex}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`text-3xl font-bold mb-1 ${getMetricColor(
                      project.color
                    )}`}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      delay: index * 0.2 + 0.5 + metricIndex * 0.1,
                    }}
                  >
                    {metric.value}
                  </motion.div>
                  <div className="text-sm text-neutral">
                    {metric.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  My Role & Responsibilities
                </h4>
                <ul className="text-neutral space-y-1 text-sm">
                  {project.responsibilities.map((responsibility, respIndex) => (
                    <li
                      key={respIndex}
                      data-testid={`project-responsibility-${index}-${respIndex}`}
                    >
                      • {responsibility}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Key Achievements
                </h4>
                <ul className="text-neutral space-y-1 text-sm">
                  {project.achievements.map((achievement, achIndex) => (
                    <li
                      key={achIndex}
                      data-testid={`project-achievement-${index}-${achIndex}`}
                    >
                      • {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                    data-testid={`project-skill-${index}-${skillIndex}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
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

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-testid="projects-title"
          >
            Featured Project Portfolio
          </h2>
          <p
            className="text-xl text-neutral max-w-3xl mx-auto"
            data-testid="projects-description"
          >
            Detailed case studies showcasing my project management expertise and
            measurable business impact
          </p>
        </div>

        {projects?.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
