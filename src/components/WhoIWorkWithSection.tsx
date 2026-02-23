import { motion } from 'framer-motion';
import { Building2, GraduationCap, Users, DollarSign } from 'lucide-react';

const whoIWorkWith = [
  {
    icon: Building2,
    label: 'Service businesses and professional practices',
  },
  {
    icon: GraduationCap,
    label: 'Healthcare, education, and local service providers',
  },
  {
    icon: Users,
    label: 'Growth-stage businesses scaling beyond founder-led growth',
  },
  {
    icon: DollarSign,
    label: 'Businesses investing ₹1L–₹10L/month in marketing',
  },
];

export function WhoIWorkWithSection() {
  return (
    <section className="bg-secondary/10 py-20 md:py-32">
      <div className="container-narrow mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-section text-primary mb-8 text-center"
          >
            Who I Work With
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {whoIWorkWith.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-medium text-primary">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
