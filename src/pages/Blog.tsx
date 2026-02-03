import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { PaginationControls } from '@/components/PaginationControls';
import { BlogCardSkeleton } from '@/components/ContentSkeleton';
import { useNotionBlogs } from '@/hooks/useNotionContent';
import { usePagination } from '@/hooks/usePagination';

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useNotionBlogs();
  
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedPosts,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({
    items: blogPosts,
    itemsPerPage: POSTS_PER_PAGE,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Header */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container-wide mx-auto px-6 md:px-12 lg:px-24">
            {/* Back Link */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-display text-primary mb-4">
                Insights & Perspectives
              </h1>
              <p className="text-body text-slate max-w-2xl">
                Thoughts on growth, GTM strategy, and building revenue engines that scale. 
                Lessons from 21+ years leading growth at B2B, SaaS, Fintech, and EdTech companies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding pt-8">
          <div className="container-wide mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {isLoading ? (
                <BlogCardSkeleton count={POSTS_PER_PAGE} />
              ) : (
                paginatedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))
              )}
            </div>

            {/* Pagination */}
            {!isLoading && blogPosts.length > 0 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
