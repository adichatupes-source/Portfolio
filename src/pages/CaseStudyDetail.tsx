import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, GraduationCap, Globe, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CaseStudyDetailSkeleton } from '@/components/ContentSkeleton';
import { useNotionCaseStudy } from '@/hooks/useNotionContent';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  GraduationCap,
  Globe,
};

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: study, isLoading, notFound } = useNotionCaseStudy(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <CaseStudyDetailSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !study) {
    return <Navigate to="/case-studies" replace />;
  }

  const Icon = iconMap[study.icon] || Building2;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            {/* Back Link */}
            <Link 
              to="/case-studies" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Case Studies
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Icon and Meta */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {study.industry}
                  </span>
                  <p className="text-lg text-foreground font-medium">{study.company}</p>
                </div>
              </div>

              {/* Title */}
              <h1 className="heading-display text-primary">
                {study.title}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding pt-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Context */}
                <div>
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    Context
                  </h2>
                  <p className="text-slate leading-relaxed">
                    {study.context}
                  </p>
                </div>

                {/* Challenge */}
                <div>
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    The Challenge
                  </h2>
                  <ul className="space-y-3">
                    {study.challenge.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate">
                        <span className="w-1.5 h-1.5 bg-cta rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Approach */}
                <div>
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    My Approach
                  </h2>
                  <p className="text-slate leading-relaxed">
                    {study.approach}
                  </p>
                </div>
              </motion.div>

              {/* Right Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Actions */}
                <div>
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    What I Did
                  </h2>
                  <ul className="space-y-3">
                    {study.actions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div>
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    Outcomes
                  </h2>
                  <ul className="space-y-3">
                    {study.outcomes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What This Proves */}
                <div className="bg-primary/5 rounded-xl p-6">
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    What This Proves
                  </h2>
                  <p className="text-foreground leading-relaxed">
                    {study.proves}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
