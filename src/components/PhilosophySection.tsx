import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { InteractiveFunnel } from './InteractiveFunnel';
import { Lightbulb, Target, BarChart3, Layers, Users } from 'lucide-react';

const principles = [
  {
    icon: Lightbulb,
    title: 'Clear GTM thinking before channel execution',
  },
  {
    icon: Target,
    title: 'Full-funnel ownership, from first touch to revenue',
  },
  {
    icon: BarChart3,
    title: 'Discipline around CAC, ROI, and growth economics',
  },
  {
    icon: Layers,
    title: 'Strong infrastructure, data, and process',
  },
  {
    icon: Users,
    title: 'Teams that understand "why," not just "what"',
  },
];

export function PhilosophySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="philosophy" ref={ref} className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-section text-primary mb-4">How I Think About Growth</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            Sustainable growth comes from systems, not spikes. Marketing should be a predictable, measurable function that leadership can rely on.
          </p>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 bg-secondary/50 px-4 py-3 rounded-lg border border-border/50"
              >
                <principle.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {principle.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
              The Growth Framework
            </h3>
            <p className="text-sm text-slate">
              Explore each stage of the funnel to see my approach
            </p>
          </div>
          <InteractiveFunnel />
        </motion.div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl font-serif text-primary italic max-w-3xl mx-auto">
            "Growth should scale with clarity, not chaos."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
