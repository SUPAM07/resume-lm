// Shared constants used across frontend and backend

/** Subscription plans */
export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  PRO: 'pro',
} as const;

export type SubscriptionPlan = typeof SUBSCRIPTION_PLANS[keyof typeof SUBSCRIPTION_PLANS];

/** Resume limits per subscription plan */
export const RESUME_LIMITS = {
  [SUBSCRIPTION_PLANS.FREE]: {
    base_resumes: 1,
    tailored_resumes: 3,
  },
  [SUBSCRIPTION_PLANS.PRO]: {
    base_resumes: 5,
    tailored_resumes: 25,
  },
} as const;

/** Employment types for job listings */
export const EMPLOYMENT_TYPES = [
  'full_time',
  'part_time',
  'co_op',
  'internship',
  'contract',
] as const;

/** Work location types */
export const WORK_LOCATION_TYPES = ['remote', 'in_person', 'hybrid'] as const;

/** Default document settings for new resumes */
export const DEFAULT_DOCUMENT_SETTINGS = {
  document_font_size: 10,
  document_line_height: 1.5,
  document_margin_vertical: 36,
  document_margin_horizontal: 36,
  header_name_size: 24,
  header_name_bottom_spacing: 4,
  skills_margin_top: 2,
  skills_margin_bottom: 2,
  skills_margin_horizontal: 0,
  skills_item_spacing: 2,
  experience_margin_top: 2,
  experience_margin_bottom: 2,
  experience_margin_horizontal: 0,
  experience_item_spacing: 6,
  projects_margin_top: 2,
  projects_margin_bottom: 2,
  projects_margin_horizontal: 0,
  projects_item_spacing: 6,
  education_margin_top: 2,
  education_margin_bottom: 2,
  education_margin_horizontal: 0,
  education_item_spacing: 6,
} as const;
