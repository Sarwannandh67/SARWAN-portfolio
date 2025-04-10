import { useEffect, useState, useCallback } from "react";
import { useLoading } from "../contexts/LoadingContext";
import Layout from "../components/Layout/Layout";
import { Card } from "../components/ui/card";
import { Avatar } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import EntranceAnimation from "../components/ui/EntranceAnimation";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Code as SearchIcon } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications",
    excerpt: "Learn how to create stunning web applications using modern technologies and best practices. Discover the power of React, TypeScript, and modern CSS frameworks.",
    image: "/images/blog/web-dev.jpg",
    date: "2024-03-15",
    author: "John Doe",
    authorAvatar: "/images/avatars/john.jpg",
    category: "Web Development",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Future of AI in Software Development",
    excerpt: "Explore how artificial intelligence is transforming the way we write, test, and deploy software. From code generation to automated testing, AI is revolutionizing development.",
    image: "/images/blog/ai-dev.jpg",
    date: "2024-03-14",
    author: "Jane Smith",
    authorAvatar: "/images/avatars/jane.jpg",
    category: "Artificial Intelligence",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Mastering TypeScript",
    excerpt: "Deep dive into TypeScript's advanced features and learn how to write more maintainable and scalable code. Tips and tricks from real-world projects.",
    image: "/images/blog/typescript.jpg",
    date: "2024-03-13",
    author: "Mike Johnson",
    authorAvatar: "/images/avatars/mike.jpg",
    category: "TypeScript",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    excerpt: "Learn the fundamental principles of creating beautiful and functional user interfaces. From color theory to responsive design, master the art of user experience.",
    image: "/images/blog/ui-ux.jpg",
    date: "2024-03-12",
    author: "Sarah Wilson",
    authorAvatar: "/images/avatars/sarah.jpg",
    category: "Design",
    readTime: "4 min read"
  }
];

const categories = ["All", "Web Development", "Artificial Intelligence", "TypeScript", "Design"];

const Blog = () => {
  const { showAdvancedLoading, hideLoading } = useLoading();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisiblePosts(prev => prev + 3);
      setIsLoadingMore(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress <= 100) {
        showAdvancedLoading("Loading blog posts...", progress);
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

  return (
    <Layout>
      <EntranceAnimation type="fade" duration={0.5}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 py-10 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl shadow-md border border-primary/10">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-2 text-primary">Blog</h1>
              <p className="text-gray-600 text-sm">Explore our latest articles and insights</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                <EntranceAnimation
                  key={post.id}
                  type="slide-up"
                  duration={0.5}
                  delay={0.1 * index}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <span className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full text-xs">
                        {post.readTime}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <Avatar
                          src={post.authorAvatar}
                          alt={post.author}
                          className="w-8 h-8 mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                        <Button variant="ghost" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </EntranceAnimation>
              ))}
            </div>
            
            {visiblePosts < filteredPosts.length && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="w-40"
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </EntranceAnimation>
    </Layout>
  );
};

export default Blog;
