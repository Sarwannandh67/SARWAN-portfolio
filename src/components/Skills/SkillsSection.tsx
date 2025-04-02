
import { Code, Database, Terminal } from "lucide-react";
import ScrollReveal from "../UI/ScrollReveal";
import GlassCard from "../UI/GlassCard";

type Skill = {
  name: string;
  icon: string;
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
      { name: "React.js", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Next.js", icon: "nextjs" },
      { name: "HTML/CSS", icon: "html" },
    ],
  },
  {
    title: "Backend Development",
    icon: <Database className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    title: "Development Tools",
    icon: <Terminal className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "VS Code", icon: "vscode" },
      { name: "GitHub", icon: "github" },
      { name: "Figma", icon: "figma" },
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
                <div className="grid grid-cols-3 gap-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 p-2 mb-2">
                        <div className={`icon-${skill.icon} w-8 h-8 bg-primary/60 rounded-md flex items-center justify-center`}>
                          {skill.name.substring(0, 2)}
                        </div>
                      </div>
                      <span className="text-sm">{skill.name}</span>
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
