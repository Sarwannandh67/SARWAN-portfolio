import { useState } from "react";
import ScrollReveal from "../ui/ScrollReveal";
import GlassCard from "../ui/GlassCard";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Project data
const projects = [
  {
    id: 1,
    title: "Lost n' Found Notification System",
    description: "A modern notification system to help campus communities reconnect with lost items.",
    tags: ["UNO", "C++", "Aurduino", "IoT"],
    imageUrl: "/projects/project1.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "GradePro for SRM",
    description: "A grade calculator app designed specifically for SRM University students.",
    tags: ["React", "TypeScript", "CSS Modules"],
    imageUrl: "/projects/project2.png",
    liveUrl: "/gradepro",
    githubUrl: "#",
    isInternal: true
  },
  {
    id: 3,
    title: "Mess.ly for SRM",
    description: "An app to help students manage their mess food options and schedules.",
    tags: ["HTML5", "CSS3", "Java Script"],
    imageUrl: "/projects/project3.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "WarZone Royale ESports",
    description: "An Advanced website which collects credentials of the Players for Esports Tournaments.",
    tags: ["HTML5", "CSS3", "Java Script", "PHP", "MySQL", "PHPMyAdmin"],
    imageUrl: "/projects/warzone.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Animal Cell Interactive Website",
    description: "An educational interactive website that visualizes an animal cell using modern web design techniques. Users can explore different parts of the cell through an intuitive interface, hovering over organelles to see their names and clicking on them to learn detailed information.",
    tags: ["HTML5", "CSS3", "Java Script", "PHP"],
    imageUrl: "/projects/animal-cell.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "French History Website",
    description: "An interactive website covers major historical events in French history, providing engaging features, placeholder videos, and hover effects to enhance user engagement and learning. It incorporates glassmorphism design to give the website a modern and sleek visual style.",
    tags: ["HTML5", "CSS3", "Java Script", "PHP"],
    imageUrl: "/projects/french-history.png",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal delay={400}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center">Projects</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore my recent work and the technologies I've been working with.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={600 + index * 200}
              threshold={0.2}
            >
              <GlassCard 
                className="h-full flex flex-col group relative overflow-hidden"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-50 z-10" />
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-20" />
                </div>

                {/* Project Content */}
                <div className="relative z-30 p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full transition-all duration-500 group-hover:bg-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-6">
                    {project.isInternal ? (
                      <Link 
                        to={project.liveUrl} 
                        className="flex items-center gap-2 text-sm hover:text-primary transition-all duration-300 group-hover:translate-x-1"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                        <span>Live Demo</span>
                      </Link>
                    ) : (
                      <a 
                        href={project.liveUrl} 
                        className="flex items-center gap-2 text-sm hover:text-primary transition-all duration-300 group-hover:translate-x-1"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <a 
                      href={project.githubUrl} 
                      className="flex items-center gap-2 text-sm hover:text-primary transition-all duration-300 group-hover:translate-x-1"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
