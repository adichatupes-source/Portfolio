import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useContactModal } from './ContactModalContext';

export function HeroSection() {
  const { openModal } = useContactModal();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-background to-secondary/30 pt-20">
      <div className="container-narrow mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Credibility Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Growth & Marketing Leadership
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="heading-display text-primary mb-6"
          >
            I help B2B and EdTech companies build predictable revenue engines.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-body text-slate max-w-2xl mb-4"
          >
            Fractional CMO for growth-stage companies that need pipeline, not more marketing activity. I work across GTM strategy, demand generation, and growth infrastructure to drive measurable revenue.
          </motion.p>

          {/* Credibility Line */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm text-muted-foreground mb-10"
          >
            Former Head of Growth & Marketing at leading fintech, education, and global services brands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={openModal}
              className="btn-primary text-center"
            >
              Book a Strategy Call
            </button>
            <button
              onClick={() => scrollToSection('#case-studies')}
              className="btn-secondary text-center"
            >
              View Case Studies
            </button>
          </motion.div>

          {/* CTA Badges (now below CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-2 mt-6 mb-6"
          >
            <span className="badge bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">$X Mn+ pipeline generated</span>
            <span className="badge bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">$X Mn+ ad spend managed</span>
            <span className="badge bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">10+ markets</span>
            <span className="badge bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">Teams built and scaled (0–10+)</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection('#services')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to next section"
          >
            <span className="text-xs uppercase tracking-wider">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
