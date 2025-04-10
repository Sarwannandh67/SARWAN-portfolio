import { BookOpen, Code2, Monitor } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import GlassCard from "../ui/GlassCard";

type EducationItem = {
  year: string;
  degree: string;
  institution: string;
  description: string;
  icon: React.ReactNode;
  grade?: string;
};

const educationItems: EducationItem[] = [
  {
    year: "2024 - 2028",
    degree: "B.Tech CSE - AI&ML",
    institution: "SRM Institute of Science and Technology",
    description: "Specialized in Artificial Intelligence and Machine Learning. Completed projects in Full Stack Development, Machine Learning, and Real-Time Applications.",
    icon: <Code2 className="h-6 w-6 text-primary" />,
    grade: "1st SEM SGPA: 7.6/10"
  },
  {
    year: "2022 - 2024",
    degree: "Higher Secondary Education",
    institution: "Narayana Junior College",
    description: "Focused on Mathematics, physics and chemistry. Developed foundation and participated in Nation level exams.",
    icon: <Monitor className="h-6 w-6 text-primary" />,
    grade: "Percentage: 82%"
  },
  {
    year: "2021 - 2022",
    degree: "Secondary Education",
    institution: "Bhashayam High School",
    description: "Completed with better percentage in Science and Mathematics. Active participation in science exhibitions and computer clubs.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    grade: "Percentage: 95%"
  }
];

const EducationTimeline = () => {
  return (
    <ScrollReveal delay={600} threshold={0.1}>
      <div className="mt-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center animate-fade-in">Education</h2>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in delay-300">
          My academic journey and learning path
        </p>

        <div className="relative">
          {/* Vertical timeline line with enhanced gradient and glow */}
          <div className="absolute left-[calc(3%+0.5rem)] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.4)] animate-timeline-line" />
          
          <div className="space-y-24">
            {educationItems.map((item, index) => (
              <ScrollReveal key={index} delay={800 + index * 300} threshold={0.1}>
                <div className="relative flex flex-col md:flex-row items-center gap-8 group">
                  {/* Timeline dot with enhanced glow and pulse animation */}
                  <div className="absolute left-[calc(3%+0.5rem)] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary/20 border-2 border-primary hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.4)] animate-pulse hover:scale-110 transition-transform duration-300" />
                  
                  {/* Year with enhanced design */}
                  <div className="w-full md:w-52 text-center md:text-right">
                    <div className="inline-block transform transition-all duration-300 hover:scale-105">
                      <span className="text-primary font-medium bg-primary/10 px-5 py-2.5 rounded-full shadow-sm hover:bg-primary/20 transition-all duration-300 hover:shadow-md">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content card with enhanced design */}
                  <div className="flex-1 w-full">
                    <GlassCard className="p-8 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 group relative overflow-hidden hover:border-primary/20">
                      {/* Decorative line with gradient */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent group-hover:from-primary/40 group-hover:via-primary/30 transition-colors duration-300" />
                      
                      <div className="flex items-start gap-6">
                        <div className="p-4 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
                            {item.degree}
                          </h3>
                          <p className="text-muted-foreground mt-2 text-lg group-hover:text-foreground transition-colors duration-300">
                            {item.institution}
                          </p>
                          {item.grade && (
                            <div className="mt-3 inline-block transform transition-all duration-300 hover:scale-105">
                              <span className="text-primary font-medium bg-primary/10 px-4 py-1.5 rounded-full hover:bg-primary/20 transition-all duration-300 hover:shadow-md">
                                {item.grade}
                              </span>
                            </div>
                          )}
                          <p className="text-muted-foreground mt-4 group-hover:text-foreground transition-all duration-300 group-hover:translate-x-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default EducationTimeline; 