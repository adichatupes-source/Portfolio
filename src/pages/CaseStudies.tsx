import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, GraduationCap, Globe } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PaginationControls } from '@/components/PaginationControls';
import { CaseStudyCardSkeleton } from '@/components/ContentSkeleton';
import { useNotionCaseStudies } from '@/hooks/useNotionContent';
import { usePagination } from '@/hooks/usePagination';

const ITEMS_PER_PAGE = 6;

const iconMap: Record<string, React.ElementType> = {
  Building2,
  GraduationCap,
  Globe,
};

export default function CaseStudies() {
  const { data: caseStudies = [], isLoading } = useNotionCaseStudies();


  // Only show case studies with title, slug, and status 'Published'
  const validStudies = caseStudies.filter(study => study.title && study.slug && study.status === 'Published');

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedStudies,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({
    items: validStudies,
    itemsPerPage: ITEMS_PER_PAGE,
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
                Case Studies
              </h1>
              <p className="text-body text-slate max-w-2xl">
                Real growth outcomes from strategy, systems, and execution. Across healthcare, education, B2B, and service businesses — each engagement focused on measurable business outcomes. <br></>
                Each case follows: Context → Challenge → Approach → Actions → Outcomes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="section-padding pt-8">
          <div className="container-wide mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {isLoading ? (
                <CaseStudyCardSkeleton count={ITEMS_PER_PAGE} />
              ) : (
                paginatedStudies.map((study, index) => {
                  const Icon = iconMap[study.icon] || Building2;
                  
                  return (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link to={`/case-studies/${study.slug}`} className="group block">
                        <article className="card-elevated h-full flex flex-col">
                          {/* Icon and Industry */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {study.industry}
                              </span>
                              <p className="text-sm text-slate">{study.company}</p>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {study.title}
                          </h3>

                          {/* Context */}
                          <p className="text-sm text-slate line-clamp-3 mb-4 flex-1">
                            {study.context}
                          </p>

                          {/* View Link */}
                          <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                            View Case Study
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {!isLoading && caseStudies.length > 0 && (
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
