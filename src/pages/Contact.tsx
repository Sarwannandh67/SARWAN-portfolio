import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import Layout from "../components/Layout/Layout";
import { Mail, Code } from "lucide-react";
import ScrollReveal from "../components/ui/ScrollReveal";
import GlassCard from "../components/ui/GlassCard";
import { toast } from "@/hooks/use-toast";
import EntranceAnimation from "../components/ui/EntranceAnimation";
import emailjs from '@emailjs/browser';

type FormState = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { showAdvancedLoading, hideLoading } = useLoading();
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress <= 100) {
        showAdvancedLoading("Loading contact page...", progress);
      } else {
        clearInterval(interval);
        hideLoading();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      hideLoading();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace these with your actual EmailJS credentials
      const serviceId = 'service_da97n3j';
      const templateId = 'template_7buq0rs';
      const publicKey = 'QosEMiDb1zcorgz5K';

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <EntranceAnimation type="fade" duration={0.5}>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal delay={400}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center">Get In Touch</h1>
              <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Have a project in mind or just want to say hello? Feel free to reach out.
              </p>
            </ScrollReveal>

            <div className="flex flex-col md:flex-row gap-8">
              <ScrollReveal delay={600} className="md:w-2/5">
                <GlassCard className="p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Info</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/20 mt-1">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Email</h4>
                        <a 
                          href="mailto:sarwannandhofficial672007@gmail.com" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          sarwannandhofficial672007@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/20 mt-1">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">GitHub</h4>
                        <a 
                          href="https://github.com/Sarwannandh67" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          github.com/Sarwannandh67
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/20 mt-1">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Portfolio</h4>
                        <a 
                          href="https://sarwan67.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          sarwan67.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    I'm currently available for freelance work and full-time positions. 
                    Let's create something amazing together!
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={800} className="md:w-3/5">
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-muted/50 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your Name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-muted/50 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-muted/50 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="How can I help you?"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </EntranceAnimation>
    </Layout>
  );
};

export default Contact; 