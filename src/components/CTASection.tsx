import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import { ElfsightContactForm } from './ElfsightContactForm';
import { ContactFormModal } from './ContactFormModal';
import { useContactModal } from './ContactModalContext';


export function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { open, openModal, closeModal } = useContactModal();

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
            Need predictable pipeline, not more campaigns?
          </h2>
          <p className="text-xl text-slate mb-10">
            I work with a limited number of companies each quarter.
          </p>

          {/* Primary Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 flex flex-col items-center gap-3"
          >
            <button
              type="button"
              className="inline-flex items-center gap-3 btn-primary text-lg"
              onClick={openModal}
            >
              Book a 30-min Strategy Call
              <ArrowRight className="w-5 h-5" />
            </button>
            {/* WhatsApp chat is now always available as a floating button via Elfsight. Optionally, you can add a note or a link: */}
            <a
              href="https://wa.me/919354991341?text=Hi%20Aditya%2C%20I%20would%20like%20to%20discuss%20growth%20opportunities."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 btn-secondary text-lg"
              title="Chat on WhatsApp"
            >
              Chat on WhatsApp
            </a>
            {/* <p className="text-sm text-muted-foreground mt-4">
              Calendar booking coming soon • Currently scheduling via email
            </p> */}
          </motion.div>



          {/* Badges above contact links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            <span className="badge bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">Available for Fractional CMO</span>
            <span className="badge bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">Growth Consulting</span>
            <span className="badge bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">GTM Projects</span>
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
