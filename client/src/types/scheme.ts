export interface Scheme {
  id: number;
  name: string;
  category: string;
  match: number;
  type: "Strong" | "Partial";
  benefits: string;
  description: string;
  whyMatch: string[];
  documents: string[];
  applicationSteps: string[];
}