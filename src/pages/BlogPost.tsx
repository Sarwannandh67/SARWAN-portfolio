import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Layout from "../components/Layout/Layout";
import { getPostBySlug, type BlogPost } from "../utils/blog";
import { Avatar } from "../components/ui/avatar";
import EntranceAnimation from "../components/ui/EntranceAnimation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  Share,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Clock,
  Calendar
} from "lucide-react";
import { cn } from "../lib/utils";

const BlogPostPage = () => {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const articleRef = useRef<HTMLElement>(null);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"]
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!params.slug) {
          throw new Error('No slug provided');
        }
        const fetchedPost = getPostBySlug(params.slug);
        if (!fetchedPost) {
          throw new Error('Blog post not found');
        }
        setPost(fetchedPost);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.slug]);

  // Handle scroll spy for table of contents
  useEffect(() => {
    if (!post) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [post]);

  const shareOnTwitter = (title: string, url: string) => {
    const tweetText = encodeURIComponent(title);
    const tweetUrl = encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You might want to add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      );
    }

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Blog post not found</div>
        </div>
      );
    }

    // Extract headings for table of contents
    const headings: { id: string; title: string; level: number }[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.html, 'text/html');
    doc.querySelectorAll('h2, h3').forEach((heading) => {
      const id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      headings.push({
        id,
        title: heading.textContent || '',
        level: parseInt(heading.tagName[1])
      });
    });

    return (
      <>
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
          style={{ scaleX, transformOrigin: "0%" }}
        />

        <EntranceAnimation type="fade" duration={0.5}>
          <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 py-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl shadow-md border border-primary/10 p-4">
              <Link to="/blog" className="mb-4 md:mb-0">
                <Button variant="ghost" className="group">
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  Back to Blog
                </Button>
              </Link>
              
              <div className="flex items-center gap-2 text-sm mb-4 md:mb-0">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              
              {/* Desktop share buttons */}
              <div className="hidden lg:flex gap-2">
                <Button variant="outline" size="sm" onClick={() => shareOnTwitter(post.title, window.location.href)}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnFacebook}>
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnLinkedIn}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" onClick={copyLink}>
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <article ref={articleRef} className="max-w-4xl mx-auto">
              {/* Title and Meta */}
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10" />
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>
              </header>

              {/* Description */}
              <div className="mb-8">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Table of Contents - Desktop */}
              {headings.length > 0 && (
                <div className="hidden lg:block fixed right-8 top-32 w-64 p-4 bg-background/80 backdrop-blur-sm rounded-lg border">
                  <h4 className="font-semibold mb-2">Table of Contents</h4>
                  <nav>
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                          "block py-1 text-sm transition-colors hover:text-primary",
                          heading.level === 3 && "pl-4",
                          activeSection === heading.id && "text-primary font-medium"
                        )}
                      >
                        {heading.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Blog Content */}
              <div 
                className="prose prose-lg md:prose-xl dark:prose-invert max-w-none
                  prose-headings:scroll-mt-20
                  prose-headings:font-bold
                  prose-h1:text-4xl
                  prose-h2:text-3xl
                  prose-h3:text-2xl
                  prose-p:text-muted-foreground
                  prose-blockquote:border-l-primary
                  prose-blockquote:bg-primary/5
                  prose-blockquote:py-2
                  prose-blockquote:px-4
                  prose-blockquote:rounded-r-lg
                  prose-code:bg-muted
                  prose-code:p-1
                  prose-code:rounded
                  prose-code:before:content-none
                  prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </article>
          </div>
        </EntranceAnimation>

        {/* Mobile share buttons */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background/80 backdrop-blur-sm border-t p-4 z-40">
          <div className="container mx-auto flex justify-center gap-2">
            <Button size="sm" variant="outline" onClick={() => shareOnTwitter(post.title, window.location.href)}>
              <Twitter className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={shareOnFacebook}>
              <Facebook className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={shareOnLinkedIn}>
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={copyLink}>
              <LinkIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </>
    );
  };

  return <Layout>{renderContent()}</Layout>;
};

export default BlogPostPage; 