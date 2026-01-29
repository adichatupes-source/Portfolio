import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="contact" ref={ref} className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Main CTA */}
          <h2 className="heading-display text-primary mb-4">
            Looking to build or fix your growth engine?
          </h2>
          <p className="text-xl text-slate mb-10">
            Let's talk.
          </p>

          {/* Primary Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <a
              href="mailto:aditya.chat@gmail.com?subject=Growth%20Conversation%20Request"
              className="inline-flex items-center gap-3 btn-primary text-lg"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Calendar booking coming soon • Currently scheduling via email
            </p>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="mailto:aditya.chat@gmail.com"
              className="flex items-center gap-2 text-slate hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>aditya.chat@gmail.com</span>
            </a>
            <span className="hidden sm:block text-border">|</span>
            <a
              href="https://linkedin.com/in/adityachatterjee"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn Profile</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
