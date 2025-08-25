import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CompetenciesSection from "@/components/competencies-section";
import ProjectsSection from "@/components/projects-section";
import MethodologySection from "@/components/methodology-section";
import ResourcesSection from "@/components/resources-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CompetenciesSection />
      <ProjectsSection />
      <MethodologySection />
      <ResourcesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
