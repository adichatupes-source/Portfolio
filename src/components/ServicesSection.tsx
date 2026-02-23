import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Cog, 
  Users 
} from 'lucide-react';

const services = [
{
  icon: Rocket,
  title: 'Fractional CMO Leadership',
  description: 'Own the marketing function end-to-end — GTM strategy, growth planning, budget allocation, vendor management, and executive-level reporting.',
},
{
  icon: Target,
  title: 'Demand Generation & Pipeline',
  description: 'Build predictable client acquisition through performance marketing, funnel optimization, and full-funnel revenue tracking.',
},
{
  icon: TrendingUp,
  title: 'Growth Systems & Infrastructure',
  description: 'CRM, attribution, automation, and reporting systems that turn marketing into a scalable growth engine.',
},
{
  icon: BarChart3,
  title: 'Market Entry & Scale',
  description: 'Positioning, channel testing, and GTM execution to validate new markets and scale what works.',
},
];

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="services" ref={ref} className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-primary mb-4">How I Drive Growth</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            I work with leadership teams to design, fix, and scale growth systems — not just run campaigns.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-elevated group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
