import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { BlogPostSkeleton } from '@/components/ContentSkeleton';
import { useNotionBlogPost } from '@/hooks/useNotionContent';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, notFound } = useNotionBlogPost(slug);

  // Convert markdown-like content to paragraphs
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        return;
      }
      
      if (trimmedLine.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-8 mb-4 first:mt-0">
            {trimmedLine.replace('# ', '')}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="font-serif text-2xl md:text-3xl font-semibold text-foreground mt-8 mb-4">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-6 mb-3">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('- **')) {
        const match = trimmedLine.match(/- \*\*(.+?)\*\*: (.+)/);
        if (match) {
          elements.push(
            <li key={key++} className="text-slate leading-relaxed ml-4 mb-2">
              <strong className="text-foreground">{match[1]}</strong>: {match[2]}
            </li>
          );
        }
      } else if (trimmedLine.startsWith('- ')) {
        elements.push(
          <li key={key++} className="text-slate leading-relaxed ml-4 mb-2">
            {trimmedLine.replace('- ', '')}
          </li>
        );
      } else if (trimmedLine.match(/^\d+\. /)) {
        elements.push(
          <li key={key++} className="text-slate leading-relaxed ml-4 mb-2 list-decimal">
            {trimmedLine.replace(/^\d+\. /, '')}
          </li>
        );
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        elements.push(
          <p key={key++} className="text-foreground font-semibold leading-relaxed mb-4">
            {trimmedLine.replace(/\*\*/g, '')}
          </p>
        );
      } else {
        // Process inline bold
        const parts = trimmedLine.split(/(\*\*.*?\*\*)/);
        const processedParts = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.replace(/\*\*/g, '')}</strong>;
          }
          return part;
        });
        
        elements.push(
          <p key={key++} className="text-slate leading-relaxed mb-4">
            {processedParts}
          </p>
        );
      }
    });

    return elements;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <BlogPostSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            {/* Back Link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category */}
              <Badge 
                variant="secondary" 
                className="mb-4 bg-primary/10 text-primary hover:bg-primary/20"
              >
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="heading-display text-primary mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <span>•</span>
                <time dateTime={post.publishedDate}>
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-8">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 pb-20">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto px-6 md:px-12 prose prose-slate"
          >
            {renderContent(post.content)}
          </motion.article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
