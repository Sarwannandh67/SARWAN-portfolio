
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import ScrollReveal from "../components/UI/ScrollReveal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowUpRight } from "lucide-react";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development and design.",
    date: "June 15, 2023",
    category: "Development",
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Mastering CSS Grid Layouts",
    excerpt: "A comprehensive guide to using CSS Grid for creating complex, responsive web layouts.",
    date: "July 22, 2023",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "React Performance Optimization",
    excerpt: "Tips and tricks to optimize your React application for better performance and user experience.",
    date: "August 5, 2023",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Introduction to TypeScript",
    excerpt: "Learn how TypeScript can improve your JavaScript code with static type checking.",
    date: "September 10, 2023",
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    excerpt: "Best practices for making your web applications accessible to all users.",
    date: "October 18, 2023",
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Modern API Development",
    excerpt: "Strategies for designing and developing robust APIs for modern web applications.",
    date: "November 25, 2023",
    category: "API",
    image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=2070&auto=format&fit=crop"
  }
];

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);

  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + 3, blogPosts.length));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <ScrollReveal className="mb-16" animation="fade-up" delay={100}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, visiblePosts).map((post, index) => (
            <ScrollReveal 
              key={post.id}
              delay={100 + index * 100} 
              className="h-full"
              animation="fade-up"
              threshold={0.1}
            >
              <Card className="glass-card overflow-hidden h-full flex flex-col">
                <div className="relative w-full h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="ghost" className="flex items-center gap-2 text-primary">
                    Read More <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        
        {visiblePosts < blogPosts.length && (
          <div className="flex justify-center mt-12">
            <Button 
              onClick={loadMorePosts}
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
