
import ScrollReveal from "../UI/ScrollReveal";
import GlassCard from "../UI/GlassCard";
import { Code, Monitor, Server } from "lucide-react";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "GraphQL"] },
  { category: "Other", items: ["Git", "Docker", "AWS", "Firebase", "Figma"] },
];

const services = [
  { 
    title: "Frontend Development", 
    icon: Monitor, 
    description: "Creating responsive and interactive user interfaces with modern frontend technologies."
  },
  { 
    title: "Backend Development", 
    icon: Server, 
    description: "Building robust server-side applications and APIs with scalable architecture."
  },
  { 
    title: "Full Stack Development", 
    icon: Code, 
    description: "End-to-end development of web applications from concept to deployment."
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center">About Me</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Learn more about my skills, experience, and what I can bring to your project.
          </p>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal delay={100}>
          <GlassCard className="p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="aspect-square rounded-xl overflow-hidden glass mb-4">
                  <img 
                    src="https://via.placeholder.com/400x400?text=Profile" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">My Journey</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm a passionate full-stack developer with over 5 years of experience in creating digital solutions for various industries. My journey in software development began with a curiosity for how things work on the web.
                  </p>
                  <p>
                    I specialize in building robust and scalable web applications using modern technologies. My approach combines technical expertise with a strong focus on user experience and business needs.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through writing and mentoring.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal delay={200}>
          <h3 className="text-2xl font-bold mb-6 text-center">My Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {skills.map((skillGroup, index) => (
              <GlassCard key={index} className="p-6">
                <h4 className="text-xl font-bold mb-4 gradient-text">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill}
                      className="bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>

        {/* Services */}
        <ScrollReveal delay={300}>
          <h3 className="text-2xl font-bold mb-6 text-center">Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <GlassCard 
                  key={index} 
                  className="p-6 text-center flex flex-col items-center"
                  hoverEffect={true}
                >
                  <div className="p-4 rounded-full bg-primary/20 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                  <p className="text-muted-foreground">{service.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
