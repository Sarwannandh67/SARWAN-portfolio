
import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import HeroSection from "../components/Hero/HeroSection";
import ProjectsSection from "../components/Projects/ProjectsSection";
import SkillsSection from "../components/Skills/SkillsSection";
import AboutSection from "../components/About/AboutSection";
import ContactSection from "../components/Contact/ContactSection";
import TestimonialsSection from "../components/Testimonials/TestimonialsSection";
import Footer from "../components/Layout/Footer";

const Index = () => {
  useEffect(() => {
    // Preload Lottie and other assets
    const preloadLottie = new Image();
    preloadLottie.src = "https://lottie.host/embed/2e947f5b-119b-4b9a-8b5d-7ee168361537/eJBWCuHWGt.json";
    
    // Smooth scroll for better animation experience
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          document.querySelector(targetId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <Layout>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </Layout>
  );
};

export default Index;
