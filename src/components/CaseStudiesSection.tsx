import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronDown, Building2, GraduationCap, Globe, ArrowRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  icon: React.ElementType;
  industry: string;
  company: string;
  title: string;
  context: string;
  challenge: string[];
  approach: string;
  actions: string[];
  outcomes: string[];
  proves: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'fintech',
    icon: Building2,
    industry: 'Fintech / Payments',
    company: 'WCT Pay',
    title: 'Fintech GTM & Growth Scale',
    context: 'Growth-stage fintech payments organization needing to establish market credibility and build a scalable demand engine.',
    challenge: [
      'Low market credibility in a trust-sensitive fintech category',
      'High acquisition costs with inconsistent lead quality',
      'Fragmented growth efforts across channels',
      'Limited visibility into funnel performance and ROI',
    ],
    approach: 'Treated this as a GTM and growth infrastructure problem, not a campaign problem. Focus on establishing trust before scaling spend, designing full-funnel architecture, and creating visibility into unit economics.',
    actions: [
      'Defined clear product positioning aligned to target customer segments',
      'Designed acquisition strategy across paid media, SEO, partnerships, and affiliates',
      'Reworked landing pages, lead flows, and onboarding journeys',
      'Built leadership dashboards covering CAC, CPL, ROAS, and funnel conversion',
      'Led cross-functional teams across performance, content, creative, and growth',
    ],
    outcomes: [
      'Improved acquisition efficiency and lead quality',
      'Created a scalable, repeatable GTM and demand engine',
      'Established trust and credibility in competitive fintech market',
      'Marketing moved from "activity" to a measurable revenue contributor',
    ],
    proves: 'Ability to lead GTM and growth in regulated, trust-led categories with strong understanding of growth economics and funnel architecture.',
  },
  {
    id: 'edtech',
    icon: GraduationCap,
    industry: 'EdTech / Higher Education',
    company: 'ISB & UPES',
    title: 'EdTech Enrollment Growth',
    context: 'Premium education programs at ISB and UPES requiring large-scale student acquisition while maintaining quality and cost efficiency.',
    challenge: [
      'Intense competition in executive education and higher education space',
      'Pressure to reduce cost per acquisition while scaling volume',
      'Complex, long sales cycles with multiple stakeholder touchpoints',
      'Need for clear attribution across fragmented student journeys',
    ],
    approach: 'Built systematic acquisition engines focused on quality over volume, with clear attribution models and stage-wise funnel optimization.',
    actions: [
      'Redesigned paid media strategy with focus on intent-based targeting',
      'Implemented multi-touch attribution to understand true acquisition costs',
      'Created nurturing sequences aligned to student decision timelines',
      'Optimized landing pages and application flows for conversion',
      'Established real-time dashboards for performance visibility',
    ],
    outcomes: [
      'Scaled lead volume from 20,000 to 100,000+ quality leads',
      'Achieved significant CAC reduction through funnel optimization',
      '2x growth in qualified enrollments year-over-year',
      'Established predictable enrollment forecasting models',
    ],
    proves: 'Experience scaling high-consideration purchases with long sales cycles, and ability to build attribution clarity in complex B2C journeys.',
  },
  {
    id: 'market-entry',
    icon: Globe,
    industry: 'Global Education Services',
    company: 'AECC Global',
    title: 'Market Entry & Break-Even',
    context: "AECC Global's India market launch from scratch — building the entire marketing function and regional presence.",
    challenge: [
      'Entering a new market with no existing brand presence',
      'Need to build marketing function from zero',
      'Requirement to achieve break-even within aggressive timeline',
      'Regional expansion across diverse markets (Punjab, Gujarat, Telangana)',
    ],
    approach: 'Designed GTM strategy focused on rapid market penetration while building sustainable growth infrastructure and high-performing teams.',
    actions: [
      'Developed comprehensive GTM strategy for India market entry',
      'Built marketing team and established operational processes',
      'Rolled out regional expansion with localized strategies',
      'Created performance frameworks with clear accountability',
      'Established vendor and agency partnerships for scale',
    ],
    outcomes: [
      'Achieved break-even within 12 months of market entry',
      'Built high-performing marketing teams across regions',
      'Established sustainable demand engine for continued growth',
      'Created playbook for future regional expansions',
    ],
    proves: 'Capability to build from scratch, achieve ambitious timelines, and create sustainable growth systems in new markets.',
  },
];

export function CaseStudiesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

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
          <h2 className="heading-section text-primary mb-4">Signature Case Studies</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            Proof of impact through structured storytelling. Each case follows: Context → Challenge → Approach → Actions → Outcomes.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              {/* Case Header */}
              <button
                onClick={() => toggleCase(study.id)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                    <study.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
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
          ))}
        </div>

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
