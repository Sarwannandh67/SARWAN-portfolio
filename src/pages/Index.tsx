import { useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import Layout from "../components/Layout/Layout";
import HeroSection from "../components/Hero/HeroSection";
import ProjectsSection from "../components/Projects/ProjectsSection";
import SkillsSection from "../components/Skills/SkillsSection";
import AboutSection from "../components/About/AboutSection";
import EntranceAnimation from "../components/UI/EntranceAnimation";

const Index = () => {
  const { showAdvancedLoading, hideLoading } = useLoading();

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        showAdvancedLoading("Loading your experience...", progress);
      } else {
        clearInterval(interval);
        hideLoading();
      }
    }, 150);

    return () => {
      clearInterval(interval);
      hideLoading();
    };
  }, []);

  return (
    <Layout>
      <EntranceAnimation type="fade" duration={0.5}>
        <HeroSection />
      </EntranceAnimation>
      
      <EntranceAnimation type="slide-up" duration={0.7} delay={0.2}>
        <SkillsSection />
      </EntranceAnimation>
      
      <EntranceAnimation type="slide-up" duration={0.7} delay={0.3}>
        <AboutSection />
      </EntranceAnimation>
      
      <EntranceAnimation type="slide-up" duration={0.7} delay={0.4}>
        <ProjectsSection />
      </EntranceAnimation>
    </Layout>
  );
};

export default Index;
