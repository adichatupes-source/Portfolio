import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { CredibilitySection } from '@/components/CredibilitySection';
import { AboutSection } from '@/components/AboutSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <CaseStudiesSection />
        <PhilosophySection />
        <CredibilitySection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
