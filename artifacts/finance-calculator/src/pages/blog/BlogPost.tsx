import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { blogPosts } from "@/lib/blogData";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";

function renderContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("# ")) {
      return <h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-foreground">{line.slice(2)}</h1>;
    }
    if (line.startsWith("## ")) {
      return <h2 key={i} className="text-2xl font-semibold mt-6 mb-3 text-foreground">{line.slice(3)}</h2>;
    }
    if (line.startsWith("### ")) {
      return <h3 key={i} className="text-xl font-semibold mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="ml-4 mb-1 text-muted-foreground list-disc">{line.slice(2)}</li>;
    }
    if (line.trim() === "") {
      return <br key={i} />;
    }
    const boldLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return <p key={i} className="mb-3 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: boldLine }} />;
  });
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = blogPosts.find((p) => p.slug === params?.slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | FinCalc Pro`;
    }
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-8">
        <Link href="/blog" className="text-muted-foreground hover:text-primary flex items-center text-sm font-medium w-fit transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Blog
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground leading-tight">{post.title}</h1>
        <p className="text-muted-foreground mb-8 text-lg">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
          <span>{post.author}</span>
          <span>&middot;</span>
          <span>{post.date}</span>
          <span>&middot;</span>
          <span>{post.readTime} min read</span>
        </div>
        <div className="prose-content">
          {renderContent(post.content)}
        </div>
      </motion.div>
    </article>
  );
}
