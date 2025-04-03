
import { useEffect, useRef, useState } from "react";
import { Code, Database, Terminal } from "lucide-react";
import ScrollReveal from "../UI/ScrollReveal";
import GlassCard from "../UI/GlassCard";
import { Progress } from "../ui/progress";

type Skill = {
  name: string;
  icon: string;
  proficiency: number;
};

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: <Code className="h-6 w-6 text-primary" />,
    skills: [
      { name: "React.js", icon: "react", proficiency: 90 },
      { name: "TypeScript", icon: "typescript", proficiency: 85 },
      { name: "Tailwind CSS", icon: "tailwindcss", proficiency: 95 },
      { name: "Next.js", icon: "nextjs", proficiency: 80 },
      { name: "HTML/CSS", icon: "html", proficiency: 95 },
    ],
  },
  {
    title: "Backend Development",
    icon: <Database className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Node.js", icon: "nodejs", proficiency: 85 },
      { name: "Express", icon: "express", proficiency: 80 },
      { name: "MongoDB", icon: "mongodb", proficiency: 75 },
      { name: "PostgreSQL", icon: "postgresql", proficiency: 70 },
      { name: "GraphQL", icon: "graphql", proficiency: 65 },
    ],
  },
  {
    title: "Development Tools",
    icon: <Terminal className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Git", icon: "git", proficiency: 90 },
      { name: "Docker", icon: "docker", proficiency: 75 },
      { name: "VS Code", icon: "vscode", proficiency: 95 },
      { name: "GitHub", icon: "github", proficiency: 85 },
      { name: "Figma", icon: "figma", proficiency: 80 },
    ],
  },
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal delay={400}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center">My Skills</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Expertise and technologies I work with to bring ideas to life
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollReveal key={category.title} delay={600 + categoryIndex * 200} threshold={0.1}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/20">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                      <Progress 
                        value={isVisible ? skill.proficiency : 0} 
                        className="h-2 transition-all duration-1000 ease-out"
                        style={{ 
                          transitionDelay: `${(categoryIndex * 5 + skillIndex) * 100}ms`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
