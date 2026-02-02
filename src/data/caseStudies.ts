export interface CaseStudy {
  id: string;
  slug: string;
  icon: string;
  industry: string;
  company: string;
  title: string;
  context: string;
  challenge: string[];
  approach: string;
  actions: string[];
  outcomes: string[];
  proves: string;
  featuredImage?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'fintech',
    slug: 'fintech-gtm-growth-scale',
    icon: 'Building2',
    industry: 'Fintech / Payments',
    company: 'WCT Pay',
    title: 'Fintech GTM & Growth Scale',
    context: 'Growth-stage fintech payments organization needing to establish market credibility and build a scalable demand engine.',
    challenge: [
      'Low market credibility in a trust-sensitive fintech category',
      'High acquisition costs with inconsistent lead quality',
      'Fragmented growth efforts across channels',
      'Limited visibility into funnel performance and ROI',
    ],
    approach: 'Treated this as a GTM and growth infrastructure problem, not a campaign problem. Focus on establishing trust before scaling spend, designing full-funnel architecture, and creating visibility into unit economics.',
    actions: [
      'Defined clear product positioning aligned to target customer segments',
      'Designed acquisition strategy across paid media, SEO, partnerships, and affiliates',
      'Reworked landing pages, lead flows, and onboarding journeys',
      'Built leadership dashboards covering CAC, CPL, ROAS, and funnel conversion',
      'Led cross-functional teams across performance, content, creative, and growth',
    ],
    outcomes: [
      'Improved acquisition efficiency and lead quality',
      'Created a scalable, repeatable GTM and demand engine',
      'Established trust and credibility in competitive fintech market',
      'Marketing moved from "activity" to a measurable revenue contributor',
    ],
    proves: 'Ability to lead GTM and growth in regulated, trust-led categories with strong understanding of growth economics and funnel architecture.',
  },
  {
    id: 'edtech',
    slug: 'edtech-enrollment-growth',
    icon: 'GraduationCap',
    industry: 'EdTech / Higher Education',
    company: 'ISB & UPES',
    title: 'EdTech Enrollment Growth',
    context: 'Premium education programs at ISB and UPES requiring large-scale student acquisition while maintaining quality and cost efficiency.',
    challenge: [
      'Intense competition in executive education and higher education space',
      'Pressure to reduce cost per acquisition while scaling volume',
      'Complex, long sales cycles with multiple stakeholder touchpoints',
      'Need for clear attribution across fragmented student journeys',
    ],
    approach: 'Built systematic acquisition engines focused on quality over volume, with clear attribution models and stage-wise funnel optimization.',
    actions: [
      'Redesigned paid media strategy with focus on intent-based targeting',
      'Implemented multi-touch attribution to understand true acquisition costs',
      'Created nurturing sequences aligned to student decision timelines',
      'Optimized landing pages and application flows for conversion',
      'Established real-time dashboards for performance visibility',
    ],
    outcomes: [
      'Scaled lead volume from 20,000 to 100,000+ quality leads',
      'Achieved significant CAC reduction through funnel optimization',
      '2x growth in qualified enrollments year-over-year',
      'Established predictable enrollment forecasting models',
    ],
    proves: 'Experience scaling high-consideration purchases with long sales cycles, and ability to build attribution clarity in complex B2C journeys.',
  },
  {
    id: 'market-entry',
    slug: 'market-entry-break-even',
    icon: 'Globe',
    industry: 'Global Education Services',
    company: 'AECC Global',
    title: 'Market Entry & Break-Even',
    context: "AECC Global's India market launch from scratch — building the entire marketing function and regional presence.",
    challenge: [
      'Entering a new market with no existing brand presence',
      'Need to build marketing function from zero',
      'Requirement to achieve break-even within aggressive timeline',
      'Regional expansion across diverse markets (Punjab, Gujarat, Telangana)',
    ],
    approach: 'Designed GTM strategy focused on rapid market penetration while building sustainable growth infrastructure and high-performing teams.',
    actions: [
      'Developed comprehensive GTM strategy for India market entry',
      'Built marketing team and established operational processes',
      'Rolled out regional expansion with localized strategies',
      'Created performance frameworks with clear accountability',
      'Established vendor and agency partnerships for scale',
    ],
    outcomes: [
      'Achieved break-even within 12 months of market entry',
      'Built high-performing marketing teams across regions',
      'Established sustainable demand engine for continued growth',
      'Created playbook for future regional expansions',
    ],
    proves: 'Capability to build from scratch, achieve ambitious timelines, and create sustainable growth systems in new markets.',
  },
];
