import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="overview" className="bg-gradient-to-br from-primary to-blue-700 text-white py-20 mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="bg-white/20 p-3 rounded-full mr-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <i className="fas fa-project-diagram text-2xl"></i>
              </motion.div>
              <div>
                <motion.h1 
                  className="text-4xl font-bold mb-2" 
                  data-testid="hero-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Project Management Portfolio
                </motion.h1>
                <motion.p 
                  className="text-xl text-blue-100" 
                  data-testid="hero-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Delivering Results Through Strategic Project Leadership
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div 
                className="flex items-center mb-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.i 
                  className="fas fa-certificate text-secondary mr-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="font-semibold">Asana Workflow Specialist Certified</span>
              </motion.div>
              <p className="text-blue-100 text-lg leading-relaxed" data-testid="hero-description">
                Computer Science graduate with proven expertise in managing cross-functional projects, 
                implementing process improvements, and delivering measurable business outcomes across 
                diverse industries including retail, technology, and digital media.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
                data-testid="btn-view-portfolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                View Project Portfolio
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors"
                data-testid="btn-get-in-touch"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" 
              data-testid="metric-budget"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter end={92} suffix="%" />
              </div>
              <div className="text-sm text-blue-100">Projects Delivered Within Budget</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" 
              data-testid="metric-efficiency"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter end={25} suffix="%" />
              </div>
              <div className="text-sm text-blue-100">Average Efficiency Improvement</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" 
              data-testid="metric-team"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className="text-sm text-blue-100">Team Members Managed</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl" 
              data-testid="metric-success"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter end={88} suffix="%" />
              </div>
              <div className="text-sm text-blue-100">Project Success Rate</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
