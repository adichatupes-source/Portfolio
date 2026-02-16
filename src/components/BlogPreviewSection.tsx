import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { BlogCard } from '@/components/BlogCard';
import { BlogCardSkeleton } from '@/components/ContentSkeleton';
import { useNotionBlogs } from '@/hooks/useNotionContent';

export function BlogPreviewSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { data: blogPosts = [], isLoading } = useNotionBlogs();
  
  // Filter to only valid and published blog posts
  const validPosts = blogPosts.filter(post => post.title && post.slug && post.status === 'Publish');
  // Get the 3 most recent valid blog posts
  const latestPosts = validPosts.slice(0, 3);

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-primary mb-4">Insights & Perspectives</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            Thoughts on growth, GTM strategy, and building revenue engines that scale.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            <BlogCardSkeleton count={3} />
          ) : (
            latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))
          )}
        </div>

        {/* See All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            See All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
