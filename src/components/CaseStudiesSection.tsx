import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronDown, Building2, GraduationCap, Globe, ArrowRight } from 'lucide-react';
import { CaseStudyCardSkeleton } from '@/components/ContentSkeleton';
import { useNotionCaseStudies, CaseStudy } from '@/hooks/useNotionContent';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  GraduationCap,
  Globe,
};

export function CaseStudiesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const { data: caseStudies = [], isLoading } = useNotionCaseStudies();
  // Only show case studies with title, slug, and status 'Published'
  const validCaseStudies = caseStudies.filter(study => study.title && study.slug && study.status === 'Published');

  const toggleCase = (id: string) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  return (
    <section id="case-studies" ref={ref} className="section-padding bg-secondary/30">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-primary mb-4">Selected Results</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            Proof of impact through structured storytelling. Each case follows: Context → Challenge → Approach → Actions → Outcomes.
          </p>
        </motion.div>

        {/* Case Studies */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CaseStudyCardSkeleton count={3} />
          </div>
        ) : (
          <div className="space-y-6">
            {validCaseStudies.map((study, index) => {
              const Icon = iconMap[study.icon] || Building2;
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  {/* ...existing card rendering code... */}
                  {/* Case Header */}
                  <button
                    onClick={() => toggleCase(study.id)}
                    className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {study.industry}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{study.company}</span>
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                          {study.title}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCase === study.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4"
                    >
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    </motion.div>
                  </button>
                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedCase === study.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pt-2 border-t border-border">
                          <div className="grid md:grid-cols-2 gap-8 mt-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                              {/* Context */}
                              <div>
                                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                                  Context
                                </h4>
                                <p className="text-sm text-slate leading-relaxed">
                                  {study.context}
                                </p>
                              </div>
                              {/* Challenge */}
                              <div>
                                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                                  The Challenge
                                </h4>
                                <ul className="space-y-2">
                                  {study.challenge.map((item, i) => (
                                    <li key={i} className="text-sm text-slate flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 bg-cta rounded-full mt-1.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {/* Approach */}
                              <div>
                                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                                  My Approach
                                </h4>
                                <p className="text-sm text-slate leading-relaxed">
                                  {study.approach}
                                </p>
                              </div>
                            </div>
                            {/* Right Column */}
                            <div className="space-y-6">
                              {/* Actions */}
                              <div>
                                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                                  What I Did
                                </h4>
                                <ul className="space-y-2">
                                  {study.actions.map((item, i) => (
                                    <li key={i} className="text-sm text-slate flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {/* Outcomes */}
                              <div>
                                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                                  Outcomes
                                </h4>
                                <ul className="space-y-2">
                                  {study.outcomes.map((item, i) => (
                                    <li key={i} className="text-sm text-slate flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {/* What This Proves */}
                              <div className="bg-primary/5 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-primary mb-2">
                                  What This Proves
                                </h4>
                                <p className="text-sm text-foreground leading-relaxed">
                                  {study.proves}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* See All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            See All Case Studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
