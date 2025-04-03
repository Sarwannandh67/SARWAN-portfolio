
import { useState } from "react";
import ScrollReveal from "../UI/ScrollReveal";
import GlassCard from "../UI/GlassCard";
import { Github, Link, ArrowUpRight, Sparkles } from "lucide-react";

// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product search, cart functionality, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "https://via.placeholder.com/600x400?text=E-Commerce+Platform",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    tags: ["React", "Firebase", "Tailwind CSS", "React DnD"],
    imageUrl: "https://via.placeholder.com/600x400?text=Task+Management+App",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Real Estate Listing Platform",
    description: "A comprehensive real estate platform with advanced search, filtering, map integration, and virtual tour capabilities.",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "MapBox"],
    imageUrl: "https://via.placeholder.com/600x400?text=Real+Estate+Platform",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description: "A dashboard that aggregates and visualizes data from multiple social media platforms using various data visualization techniques.",
    tags: ["Vue.js", "D3.js", "Express", "OAuth"],
    imageUrl: "https://via.placeholder.com/600x400?text=Social+Media+Dashboard",
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
                className="h-full p-6 flex flex-col group relative overflow-hidden"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Animated corner sparkle */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-video">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{ 
                      transform: hoveredProject === project.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-500 flex items-end justify-between p-4 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="space-x-3 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                      <a 
                        href={project.liveUrl} 
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all duration-300 hover:scale-110"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                      <a 
                        href={project.githubUrl} 
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all duration-300 hover:scale-110"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Sparkles size={16} className="inline-block mr-1 text-secondary" />
                      <span className="text-xs font-medium">Featured</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors relative">
                  {project.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></span>
                </h3>
                
                <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                
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
                
                <div className="flex gap-4 mt-auto">
                  <a 
                    href={project.liveUrl} 
                    className="flex items-center gap-2 text-sm hover:text-primary transition-all duration-300 group-hover:translate-x-1"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Link size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a 
                    href={project.githubUrl} 
                    className="flex items-center gap-2 text-sm hover:text-primary transition-all duration-300 group-hover:translate-x-1"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    <span>Source Code</span>
                  </a>
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
