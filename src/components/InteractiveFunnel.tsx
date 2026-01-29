import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FunnelStage {
  id: string;
  label: string;
  color: string;
  description: string;
  approach: string[];
}

const funnelStages: FunnelStage[] = [
  {
    id: 'awareness',
    label: 'Awareness',
    color: 'hsl(var(--navy))',
    description: 'Building visibility and credibility in target markets',
    approach: [
      'Strategic content and thought leadership',
      'SEO and organic search optimization',
      'Paid media for brand and demand',
      'PR and ecosystem partnerships',
    ],
  },
  {
    id: 'acquisition',
    label: 'Acquisition',
    color: 'hsl(var(--navy-light))',
    description: 'Converting attention into qualified leads',
    approach: [
      'Full-funnel paid acquisition',
      'Landing page optimization',
      'Lead magnets and value exchange',
      'Multi-channel attribution',
    ],
  },
  {
    id: 'activation',
    label: 'Activation',
    color: 'hsl(var(--cta))',
    description: 'Moving leads to meaningful engagement',
    approach: [
      'Onboarding journey design',
      'Nurture sequences and automation',
      'Sales enablement and handoffs',
      'Conversion rate optimization',
    ],
  },
  {
    id: 'revenue',
    label: 'Revenue',
    color: 'hsl(24, 80%, 40%)',
    description: 'Driving closed deals and revenue growth',
    approach: [
      'Pipeline acceleration',
      'Sales and marketing alignment',
      'Deal velocity optimization',
      'Revenue attribution and forecasting',
    ],
  },
  {
    id: 'retention',
    label: 'Retention',
    color: 'hsl(var(--charcoal))',
    description: 'Maximizing customer lifetime value',
    approach: [
      'Customer success enablement',
      'Expansion and upsell programs',
      'Advocacy and referral systems',
      'Churn prevention strategies',
    ],
  },
];

export function InteractiveFunnel() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const activeData = funnelStages.find(s => s.id === activeStage);
  const displayStage = activeStage || hoveredStage;
  const displayData = funnelStages.find(s => s.id === displayStage);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Funnel Visualization */}
      <div className="w-full lg:w-1/2">
        <div className="relative">
          {funnelStages.map((stage, index) => {
            const widthPercent = 100 - (index * 15);
            const isActive = activeStage === stage.id;
            const isHovered = hoveredStage === stage.id;
            
            return (
              <motion.button
                key={stage.id}
                onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className="block mx-auto mb-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                style={{ width: `${widthPercent}%` }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`py-4 px-6 rounded-md text-center transition-all duration-300 ${
                    isActive || isHovered 
                      ? 'shadow-lg ring-2 ring-primary/20' 
                      : ''
                  }`}
                  style={{ 
                    backgroundColor: stage.color,
                    opacity: (activeStage && !isActive) ? 0.5 : 1,
                  }}
                >
                  <span className="text-white font-medium text-sm md:text-base">
                    {stage.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
          
          {/* Instructions */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Click on any stage to explore the approach
          </p>
        </div>
      </div>

      {/* Stage Details */}
      <div className="w-full lg:w-1/2 min-h-[280px]">
        <AnimatePresence mode="wait">
          {displayData ? (
            <motion.div
              key={displayData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div 
                className="w-3 h-3 rounded-full mb-4"
                style={{ backgroundColor: displayData.color }}
              />
              <h4 className="font-serif text-2xl font-semibold text-foreground mb-2">
                {displayData.label}
              </h4>
              <p className="text-slate mb-6">
                {displayData.description}
              </p>
              <div>
                <h5 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  My Approach
                </h5>
                <ul className="space-y-2">
                  {displayData.approach.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-slate flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-cta rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-secondary/50 border border-border/50 rounded-xl p-6 flex items-center justify-center min-h-[280px]"
            >
              <p className="text-muted-foreground text-center">
                Hover or click on a funnel stage to see the detailed approach
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
