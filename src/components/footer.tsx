export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" data-testid="footer-title">
              Nicholas Njoku
            </h3>
            <p className="text-gray-300 mb-4" data-testid="footer-description">
              Certified Project Manager specializing in process optimization,
              team leadership, and delivering measurable business outcomes.
            </p>
            <div className="flex items-center">
              <i className="fas fa-certificate text-secondary mr-2"></i>
              <span className="text-sm">
                Asana Workflow Specialist Certified
              </span>
            </div>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              data-testid="footer-quick-links-title"
            >
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => scrollToSection("overview")}
                  className="hover:text-white transition-colors text-left"
                  data-testid="footer-link-overview"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="hover:text-white transition-colors text-left"
                  data-testid="footer-link-projects"
                >
                  Project Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("methodology")}
                  className="hover:text-white transition-colors text-left"
                  data-testid="footer-link-methodology"
                >
                  Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("resources")}
                  className="hover:text-white transition-colors text-left"
                  data-testid="footer-link-resources"
                >
                  Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-white transition-colors text-left"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              data-testid="footer-expertise-title"
            >
              Expertise Areas
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li data-testid="footer-expertise-planning">
                Project Planning & Execution
              </li>
              <li data-testid="footer-expertise-optimization">
                Process Optimization
              </li>
              <li data-testid="footer-expertise-leadership">
                Cross-functional Team Leadership
              </li>
              <li data-testid="footer-expertise-stakeholder">
                Stakeholder Management
              </li>
              <li data-testid="footer-expertise-transformation">
                Digital Transformation
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p data-testid="footer-copyright">
            &copy; 2025 Nicholas Njoku. All rights reserved. | Project
            Management Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
