export interface CaseStudy {
  id: string;
  client: string;
  type: string;
  year: string;
  /** CSS background or image path */
  bg: string;
  /** Main project image path */
  image?: string;
  /** Optional case study URL (external) */
  href?: string;
  /** Content for the internal dynamic page */
  description: string;
  content: {
    challenge: string;
    solution: string;
    results: string[];
  };
  /** Project-specific testimonial */
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}
