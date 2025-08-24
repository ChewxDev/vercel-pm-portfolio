import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

export default function ResourcesSection() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="resources" className="py-20 bg-background" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-testid="resources-title"
          >
            Project Resources & Documentation
          </h2>
          <p
            className="text-xl text-neutral max-w-3xl mx-auto"
            data-testid="resources-description"
          >
            Professional project management templates and resources I've
            developed for efficient project delivery
          </p>
          <motion.div
            className="mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              sectionInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-2xl">
              <div className="bg-white rounded-2xl p-6 text-center">
                <p className="text-lg text-gray-700 mb-4">
                  For complete access to all documents and spreadsheets in my
                  Project Resources & Documentation library,
                </p>
                <motion.a
                  href="https://drive.google.com/drive/folders/1_O2BYr6wQN7TounItQ_mZVx5s2P0Rqau?usp=drive_link"
                  target="_blank"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fab fa-google-drive text-2xl mr-3"></i>
                  <span className="text-lg">Visit My Google Drive</span>
                  <i className="fas fa-external-link-alt ml-3 opacity-75"></i>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
