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
              I work with companies at moments where growth matters — launches, scale-ups, turnarounds, and inflection points. My role is to bring structure, clarity, and execution discipline to growth — helping teams focus on what actually moves revenue.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body text-slate mb-6 leading-relaxed"
            >
              I typically partner with founders and leadership teams who want marketing to behave like a business function, not an experiment. Whether it's building from scratch, fixing what's broken, or scaling what's working — I approach every engagement with the same rigor and accountability I'd expect as a stakeholder.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-body text-slate leading-relaxed"
            >
              After 21+ years across B2B, SaaS, Fintech, and Education, I've learned that sustainable growth comes from systems, not heroics. The best marketing teams I've built understand the "why" behind every metric, not just the "what."
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
                Founders, CEOs, and leadership teams at growth-stage companies
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
