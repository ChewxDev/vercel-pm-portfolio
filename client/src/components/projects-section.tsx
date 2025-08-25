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
  // Use static data directly for now to bypass API issues
  const projects = [
    {
      id: "1",
      title: "Inventory Management System Implementation",
      company: "US Pawn & Jewelry",
      duration: "6 months",
      teamSize: "12 members",
      description:
        "Led cross-functional implementation of new inventory management software for precious metals, jewelry, and collectibles worth over $2M.",
      role: "Project Manager & Team Lead",
      responsibilities: [
        "Led cross-functional project team including IT, operations, and compliance staff",
        "Designed comprehensive training program for new inventory management software",
        "Coordinated stakeholder communications and progress reporting to executive team",
        "Implemented quality assurance protocols and compliance monitoring systems",
      ],
      achievements: [
        "Reduced transaction processing time by 25% through streamlined workflows",
        "Achieved 100% compliance with state pawn regulations during implementation",
        "Improved document retrieval time by 40% with digital filing systems",
        "Maintained project timeline with zero budget overruns",
      ],
      metrics: [
        {
          label: "Processing Time Reduction",
          value: "25%",
          description: "Faster transaction processing",
        },
        {
          label: "Staff Members Trained",
          value: "8",
          description: "Team members successfully onboarded",
        },
        {
          label: "Inventory Value Managed",
          value: "$2M+",
          description: "Total merchandise tracked",
        },
      ],
      skills: [
        "Project Planning",
        "Staff Training",
        "Change Management",
        "Compliance Management",
      ],
      color: "primary",
      icon: "fas fa-warehouse",
    },
    {
      id: "2",
      title: "Multi-Platform Content Strategy Execution",
      company: "Convertain Limited",
      duration: "12 months",
      teamSize: "8 members",
      description:
        "Managed end-to-end campaign execution across Twitch and YouTube platforms, driving significant audience growth and engagement.",
      role: "Social Media Manager & Project Manager",
      responsibilities: [
        "Managed end-to-end campaign execution across Twitch and YouTube platforms",
        "Coordinated with creators, designers, and marketing teams for content alignment",
        "Monitored KPIs and adjusted strategies to meet quarterly growth targets",
        "Streamlined workflows to improve project turnaround times",
      ],
      achievements: [
        "Drove 50% increase in average YouTube video views through strategic content repurposing",
        "Grew combined channel subscribers by 20% and Twitch followers by 25%",
        "Reduced project turnaround time by 20% through process optimization",
        "Ensured all campaigns met deadlines, budgets, and quality standards",
      ],
      metrics: [
        {
          label: "Video Views Increase",
          value: "50%",
          description: "Average YouTube performance boost",
        },
        {
          label: "Follower Growth",
          value: "25%",
          description: "Twitch audience expansion",
        },
        {
          label: "Faster Project Delivery",
          value: "20%",
          description: "Reduced turnaround time",
        },
      ],
      skills: [
        "Campaign Management",
        "KPI Tracking",
        "Cross-functional Coordination",
        "Process Optimization",
      ],
      color: "secondary",
      icon: "fas fa-video",
    },
    {
      id: "3",
      title: "Digital Transformation Initiative",
      company: "Lean Geeks (Xagency)",
      duration: "12 months",
      teamSize: "15+ projects",
      description:
        "Managed simultaneous digital transformation projects with software engineers, designers, and stakeholders, ensuring high success rates and budget compliance.",
      role: "Project Manager & Digital Transformation Lead",
      responsibilities: [
        "Managed simultaneous digital transformation projects with software engineers and stakeholders",
        "Conducted comprehensive project planning, monitoring, and control activities",
        "Identified and mitigated project risks with corrective action implementation",
        "Maintained detailed project documentation and stakeholder communications",
      ],
      achievements: [
        "Successfully delivered 92% of digital projects within budget constraints",
        "Improved project delivery efficiency by 25% through process improvements",
        "Maintained project success rate of 88% or higher across portfolio",
        "Reduced time-to-hire by 20% through optimized recruitment processes",
      ],
      metrics: [
        {
          label: "On-Budget Delivery",
          value: "92%",
          description: "Projects completed within budget",
        },
        {
          label: "Project Success Rate",
          value: "88%",
          description: "Overall portfolio success",
        },
        {
          label: "Efficiency Improvement",
          value: "25%",
          description: "Process optimization gains",
        },
      ],
      skills: [
        "Portfolio Management",
        "Risk Mitigation",
        "Budget Control",
        "Team Coordination",
      ],
      color: "purple",
      icon: "fas fa-laptop-code",
    },
    {
      id: "4",
      title: "Administrative Process Optimization",
      company: "Truswell",
      duration: "6 months",
      teamSize: "5 members",
      description:
        "Streamlined administrative operations as Virtual Assistant, implementing improved processes for filing systems, customer communications, and HR documentation while maintaining high accuracy and efficiency standards.",
      role: "Virtual Assistant",
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
      metrics: [
        {
          label: "Customer Satisfaction Rate",
          value: "95%",
          description: "High satisfaction maintained",
        },
        {
          label: "Process Efficiency Gain",
          value: "30%",
          description: "Improved workflow efficiency",
        },
        {
          label: "Accuracy in Documentation",
          value: "100%",
          description: "Perfect record keeping",
        },
      ],
      skills: [
        "Administrative Excellence",
        "Process Improvement",
        "Customer Service",
        "Documentation Management",
        "Virtual Collaboration",
      ],
      color: "orange",
      icon: "fas fa-cogs",
    },
  ];

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
