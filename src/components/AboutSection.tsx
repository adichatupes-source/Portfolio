import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="about" ref={ref} className="section-padding bg-secondary/30">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Section Header */}
          <h2 className="heading-section text-primary mb-8 text-center">About Me</h2>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-body text-slate mb-6 leading-relaxed"
            >
              I’m a growth and marketing leader with 21+ years of experience building predictable revenue systems for service businesses, professional practices, and growth-stage companies.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body text-slate mb-6 leading-relaxed"
            >
              I’ve worked with organizations like IDP, AECC, and multiple funded startups to launch and scale demand generation, build high-performing teams, and implement CRM, automation, and attribution systems that drive measurable growth.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-body text-slate leading-relaxed"
            >
              Today, I work with a limited number of businesses as a Fractional CMO and growth advisor, helping them generate consistent pipeline, improve marketing ROI, and scale sustainably.
            </motion.p>
          </div>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                What I Do
              </h4>
              <p className="text-sm text-slate">
                GTM strategy, demand generation, growth infrastructure, and fractional leadership
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                Who I Work With
              </h4>
              <p className="text-sm text-slate">
                Service businesses, professional practices, and growth-stage companies
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                Industries
              </h4>
              <p className="text-sm text-slate">
                B2B SaaS, Fintech, EdTech, and professional services
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
