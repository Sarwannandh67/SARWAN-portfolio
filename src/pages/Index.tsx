
import Layout from "../components/Layout/Layout";
import HeroSection from "../components/Hero/HeroSection";
import ProjectsSection from "../components/Projects/ProjectsSection";
import SkillsSection from "../components/Skills/SkillsSection";
import AboutSection from "../components/About/AboutSection";
import ContactSection from "../components/Contact/ContactSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
