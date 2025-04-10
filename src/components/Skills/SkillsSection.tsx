import { useRef } from "react";
import { Code, Terminal } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import GlassCard from "../ui/GlassCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import EducationTimeline from "./EducationTimeline";

type Skill = {
  name: string;
  icon: string;
  proficiency: number;
  description?: string;
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
      { name: "React", icon: "react", proficiency: 90, description: "Building interactive UI components with React and React hooks" },
      { name: "TypeScript", icon: "typescript", proficiency: 85, description: "Type-safe JavaScript development with TypeScript" },
      { name: "Tailwind CSS", icon: "tailwindcss", proficiency: 95, description: "Utility-first CSS framework for rapid UI development" },
      { name: "Next.js", icon: "nextjs", proficiency: 80, description: "React framework for production-ready applications" },
      { name: "HTML/CSS", icon: "html", proficiency: 95, description: "Core web technologies for structure and styling" },
    ],
  },
  {
    title: "Development Tools",
    icon: <Terminal className="h-6 w-6 text-primary" />,
    skills: [
      { name: "Git", icon: "git", proficiency: 90, description: "Distributed version control system" },
      { name: "Docker", icon: "docker", proficiency: 75, description: "Platform for developing, shipping, and running applications" },
      { name: "VS Code", icon: "vscode", proficiency: 95, description: "Lightweight but powerful source code editor" },
      { name: "GitHub", icon: "github", proficiency: 85, description: "Web-based platform for version control and collaboration" },
      { name: "Figma", icon: "figma", proficiency: 80, description: "Collaborative interface design tool" },
    ],
  },
];

// Helper function to get skill icon URL
const getSkillIconUrl = (icon: string): string => {
  const iconMap: Record<string, string> = {
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tailwindcss: "/images/tailwind-logo.png",
    nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  };
  
  return iconMap[icon] || "https://via.placeholder.com/40";
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="skills" className="py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal delay={400}>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center">My Skills</h2>
            <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Expertise and technologies I work with to bring ideas to life
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollReveal key={category.title} delay={600 + categoryIndex * 200} threshold={0.1}>
              <div>
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-primary/20">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {category.skills.map((skill) => (
                      <HoverCard key={skill.name}>
                        <HoverCardTrigger asChild>
                          <div 
                            className="flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 hover:bg-primary/10 cursor-pointer group relative overflow-hidden"
                          >
                            {/* Background gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Skill icon container */}
                            <div className="p-3 rounded-full bg-white/5 backdrop-blur-md mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                              <img 
                                src={getSkillIconUrl(skill.icon)} 
                                alt={skill.name}
                                className={`w-12 h-12 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110 ${skill.icon === 'nextjs' ? 'invert' : ''}`}
                              />
                            </div>
                            
                            {/* Skill name */}
                            <span className="text-xs sm:text-sm text-center font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                              {skill.name}
                            </span>
                            
                            {/* Proficiency indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-60 p-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold">{skill.name}</h4>
                            <span className="text-primary font-bold">{skill.proficiency}%</span>
                          </div>
                          <div className="mt-2 h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" 
                              style={{ 
                                width: `${skill.proficiency}%`,
                                transitionDelay: `${categoryIndex * 100 + 100}ms`
                              }}
                            />
                          </div>
                          {skill.description && (
                            <p className="text-sm text-muted-foreground mt-2">{skill.description}</p>
                          )}
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Add Education Timeline */}
        <EducationTimeline />
      </div>
    </section>
  );
};

export default SkillsSection;
