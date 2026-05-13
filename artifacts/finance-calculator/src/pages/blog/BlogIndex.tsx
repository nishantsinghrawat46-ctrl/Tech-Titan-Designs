import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/blogData";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogIndex() {
  useEffect(() => {
    document.title = "Finance Tips Blog | FinCalc Pro";
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Finance Tips & Guides</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Read our latest articles to make smarter financial decisions and get the most out of our calculators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <Card className="h-full cursor-pointer hover:border-primary/50 transition-all bg-card/50 backdrop-blur overflow-hidden group">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <BookOpen size={20} />
                  </div>
                  <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  <div className="mt-6 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article &rarr;
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}