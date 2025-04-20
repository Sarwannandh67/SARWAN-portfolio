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
import { getAllPosts, getTags, type BlogPost } from "../utils/blog";
import { Link } from "react-router-dom";

const Blog = () => {
  const { showAdvancedLoading, hideLoading } = useLoading();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = getAllPosts();
      const allTags = getTags();
      setPosts(allPosts);
      setTags(allTags);
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
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
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(0, visiblePosts).map((post, index) => (
              <EntranceAnimation
                key={post.slug}
                type="slide-up"
                duration={0.5}
                delay={0.1 * index}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar
                          src="/images/avatars/sarwan.jpg"
                          alt={post.author}
                          className="w-8 h-8 mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                        <span className="ml-auto text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
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
        </div>
      </EntranceAnimation>
    </Layout>
  );
};

export default Blog;
