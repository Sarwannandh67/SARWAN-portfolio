
import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Avatar } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import ScrollReveal from "../components/UI/ScrollReveal";

const blogPosts = [
  {
    id: 1,
    title: "Creating Responsive Layouts with CSS Grid",
    excerpt: "Learn how to build modern, responsive layouts using CSS Grid. This tutorial covers everything from basic grids to complex, asymmetrical designs.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "April 15, 2023",
    author: "Alex Morgan",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "CSS"
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    excerpt: "Dive deep into React Hooks and learn how they can simplify your code. We'll cover useState, useEffect, useContext and more.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    date: "March 22, 2023",
    author: "Jamie Chen",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "React"
  },
  {
    id: 3,
    title: "Building Accessible Web Forms",
    excerpt: "Accessibility is crucial for modern web applications. Learn how to create forms that everyone can use, regardless of ability.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    date: "February 10, 2023",
    author: "Taylor Smith",
    authorAvatar: "https://randomuser.me/api/portraits/women/17.jpg",
    category: "Accessibility"
  },
  {
    id: 4,
    title: "Performance Optimization Techniques for Web Apps",
    excerpt: "Discover how to make your web applications faster and more efficient with these proven optimization strategies.",
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e",
    date: "January 5, 2023",
    author: "Jordan Lee",
    authorAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
    category: "Performance"
  },
  {
    id: 5,
    title: "Introduction to TypeScript for JavaScript Developers",
    excerpt: "If you're comfortable with JavaScript, learn how TypeScript can help you write more robust, maintainable code.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
    date: "December 12, 2022",
    author: "Riley Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    category: "TypeScript"
  },
];

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <ScrollReveal className="mb-16" animation="fade-in" delay={100}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <ScrollReveal 
              key={post.id}
              delay={100 + index * 100} 
              className="h-full"
              animation="fade-in"
              threshold={0.1}
            >
              <Card className="glass-card overflow-hidden h-full flex flex-col">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <ScrollArea className="h-24">
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <div className="flex items-center w-full">
                    <Avatar className="h-8 w-8">
                      <img src={post.authorAvatar} alt={post.author} />
                    </Avatar>
                    <span className="ml-2 text-sm font-medium">{post.author}</span>
                    <button className="ml-auto text-primary hover:underline">
                      Read More
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
