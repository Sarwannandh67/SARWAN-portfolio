
import { Code, Layout, Database, Terminal, Globe, Users } from "lucide-react";
import ScrollReveal from "../UI/ScrollReveal";
import GlassCard from "../UI/GlassCard";

type Skill = {
  name: string;
  level: number;
  icon?: React.ReactNode;
};

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: <Layout className="h-6 w-6 text-primary" />,
    skills: [
      { name: "React.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Next.js", level: 80 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    title: "Backend Development",
    icon: <Database className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    title: "Development Tools",
    icon: <Terminal className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "CI/CD", level: 75 },
      { name: "AWS", level: 65 },
      { name: "Testing", level: 80 },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4">
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
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${skill.level}%`,
                            transform: 'translateX(-100%)',
                            animation: 'slideRight 1.5s ease-out forwards',
                            animationDelay: `${600 + categoryIndex * 200}ms`
                          }}
                        ></div>
                      </div>
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
