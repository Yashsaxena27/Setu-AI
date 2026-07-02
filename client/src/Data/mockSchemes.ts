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

export const mockSchemes: Scheme[] = [
  {
    id: 1,
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    match: 95,
    type: "Strong",
    benefits: "₹6,000/year financial assistance",
    description:
      "Income support scheme for eligible farmer families.",
    whyMatch: [
      "You selected Farmer as occupation.",
      "Your state supports this scheme.",
      "Your income falls within the eligibility criteria."
    ],
    documents: [
      "Aadhaar Card",
      "Bank Passbook",
      "Land Records"
    ],
    applicationSteps: [
      "Register on PM-Kisan portal.",
      "Upload required documents.",
      "Submit application.",
      "Wait for verification."
    ]
  },
  {
    id: 2,
    name: "Ayushman Bharat",
    category: "Healthcare",
    match: 76,
    type: "Partial",
    benefits: "Up to ₹5 lakh health insurance",
    description:
      "Health insurance coverage for eligible families.",
    whyMatch: [
      "Income criteria partially matched.",
      "Your age group is eligible."
    ],
    documents: [
      "Aadhaar Card",
      "Ration Card"
    ],
    applicationSteps: [
      "Visit nearest CSC.",
      "Verify eligibility.",
      "Generate Ayushman Card."
    ]
  }
];