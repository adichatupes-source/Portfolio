import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { BlogPreviewSection } from '@/components/BlogPreviewSection';
import { CredibilitySection } from '@/components/CredibilitySection';
import { AboutSection } from '@/components/AboutSection';
import { CTASection } from '@/components/CTASection';
import { ContactFormModal } from '@/components/ContactFormModal';
import { ElfsightContactForm } from '@/components/ElfsightContactForm';
import { Footer } from '@/components/Footer';
import { useContactModal } from '@/components/ContactModalContext';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { open, openModal, closeModal } = useContactModal();

  const scrollToContactAndOpen = useCallback(() => {
    const section = document.querySelector('#contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      return window.setTimeout(openModal, 500);
    }
    openModal();
    return undefined;
  }, [openModal]);

  useEffect(() => {
    const state = location.state as { contactIntent?: boolean, scrollTarget?: string } | null;
    if (state?.contactIntent) {
      const timer = scrollToContactAndOpen();
      navigate(location.pathname, { replace: true });
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
    if (state?.scrollTarget) {
      const el = document.querySelector(state.scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      navigate(location.pathname, { replace: true, state: {} });
    }
    return undefined;
  }, [location.state, location.pathname, navigate, scrollToContactAndOpen]);

  useEffect(() => {
    if (location.hash === '#contact') {
      const timer = scrollToContactAndOpen();
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
    return undefined;
  }, [location.hash, scrollToContactAndOpen]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContactFormModal open={open} onClose={closeModal}>
        {open && <ElfsightContactForm key={open ? 'open' : 'closed'} />}
      </ContactFormModal>
      <main>
        <HeroSection />
        <ServicesSection />
        <CaseStudiesSection />
        <PhilosophySection />
        <BlogPreviewSection />
        <CredibilitySection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
