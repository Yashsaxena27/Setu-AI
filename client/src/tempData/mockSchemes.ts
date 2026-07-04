export interface Scheme {
  id: number;
  name: string;
  category: string;
  match: number;
  why: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  officialLink: string;
}

export const mockSchemes: Scheme[] = [
  {
    id: 1,
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    match: 96,
    why: "You are a small farmer from Uttar Pradesh with eligible land ownership.",
    benefits: [
      "₹6000 financial assistance every year",
      "Direct Benefit Transfer",
      "Three installments annually"
    ],
    eligibility: [
      "Indian citizen",
      "Own cultivable land",
      "Small or marginal farmer"
    ],
    documents: [
      "Aadhaar Card",
      "Land Records",
      "Bank Passbook",
      "Mobile Number"
    ],
    officialLink: "https://pmkisan.gov.in"
  },

  {
    id: 2,
    name: "Ayushman Bharat",
    category: "Health",
    match: 92,
    why: "Your family profile satisfies the health coverage criteria.",
    benefits: [
      "₹5 lakh health insurance",
      "Cashless treatment",
      "Government & empanelled hospitals"
    ],
    eligibility: [
      "Eligible beneficiary",
      "SECC database inclusion"
    ],
    documents: [
      "Aadhaar Card",
      "Ration Card"
    ],
    officialLink: "https://pmjay.gov.in"
  },

  {
    id: 3,
    name: "National Scholarship Portal",
    category: "Education",
    match: 88,
    why: "You are pursuing higher education and satisfy scholarship conditions.",
    benefits: [
      "Tuition Fee Support",
      "Scholarship Amount"
    ],
    eligibility: [
      "Student",
      "Income Criteria"
    ],
    documents: [
      "Income Certificate",
      "Bonafide Certificate",
      "Aadhaar Card"
    ],
    officialLink: "https://scholarships.gov.in"
  },

  {
    id: 4,
    name: "PM Awas Yojana",
    category: "Housing",
    match: 81,
    why: "Your income category qualifies for affordable housing benefits.",
    benefits: [
      "Housing Subsidy",
      "Interest Subsidy"
    ],
    eligibility: [
      "No permanent house",
      "Eligible income group"
    ],
    documents: [
      "Income Proof",
      "Address Proof",
      "Aadhaar Card"
    ],
    officialLink: "https://pmaymis.gov.in"
  }
];