import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Users, Briefcase } from 'lucide-react';

const metrics = [
  { value: '$3 Mn+', label: 'pipeline generated' },
  { value: '$1 Mn+', label: 'marketing spend managed' },
  { value: '50+', label: 'markets across India, Middle East, and APAC' },
  { icon: Users, label: 'Teams of 8–100+ members built and led' },
  { icon: Briefcase, label: 'Experience across B2B SaaS, Fintech, and Higher Education' },
];

const companies = [
  'WCT Pay',
  'ISB',
  'UPES',
  'AECC Global',
  'UniXperts',
  'IDP Education',
  'HCL',
  'GroupM',
  'Microsoft',
];

const timeline = [
  {
    period: '2020 - Present',
    role: 'Head of Digital Marketing & Growth',
    company: 'WCT Pay',
    type: 'Fintech',
  },
  {
    period: '2018 - 2020',
    role: 'Head of Marketing & Growth',
    company: 'AECC Global / UniXperts',
    type: 'Education Services',
  },
  {
    period: '2016 - 2018',
    role: 'Head of Marketing',
    company: 'UPES',
    type: 'Higher Education',
  },
  {
    period: '2013 - 2016',
    role: 'Digital Marketing Lead',
    company: 'ISB & IDP Education',
    type: 'Executive Education',
  },
  {
    period: '2004 - 2013',
    role: 'Marketing & Media Roles',
    company: 'HCL, GroupM, Microsoft',
    type: 'Enterprise & Consulting',
  },
];

export function CredibilitySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section mb-4">Growth Impact</h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Over two decades, I've built and scaled growth engines across education, fintech, SaaS, and global services.
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-16"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="text-center bg-primary/90 rounded-lg p-6 shadow-sm flex flex-col items-center min-h-[140px] justify-center"
              >
                {metric.value ? (
                  <div className="text-3xl md:text-4xl font-serif font-bold text-cta mb-1">
                    {metric.value}
                  </div>
                ) : Icon ? (
                  <Icon className="w-8 h-8 text-cta mb-1" />
                ) : null}
                <div className={`text-base font-medium text-primary-foreground/90 uppercase tracking-wider ${!metric.value ? 'mt-2' : ''}`}>
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <p className="text-center text-sm text-primary-foreground/60 uppercase tracking-wider mb-8">
            Companies I've Worked With
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="px-4 py-2 bg-primary-foreground/10 rounded-md"
              >
                <span className="text-sm font-medium text-primary-foreground/90">
                  {company}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-center text-sm text-primary-foreground/60 uppercase tracking-wider mb-8">
            Career Journey
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-foreground/20" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cta rounded-full" />
                  
                  {/* Content */}
                  <div className={`ml-6 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="text-xs text-cta font-medium uppercase tracking-wider mb-1">
                      {item.period}
                    </div>
                    <div className="text-lg font-medium text-primary-foreground mb-1">
                      {item.role}
                    </div>
                    <div className="text-sm text-primary-foreground/70">
                      {item.company} <span className="text-primary-foreground/50">• {item.type}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
