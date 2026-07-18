const fs = require("fs");
const path = require("path");

const schemesPath = path.join(__dirname, "../data/schemes.json");
const rawData = fs.readFileSync(schemesPath, "utf-8");
const schemes = JSON.parse(rawData);

const additions = [
  {
    "scheme_name": "Lakhpati Didi Scheme",
    "category": "Women",
    "level": "Central",
    "state_applicability": [
      "All"
    ],
    "eligibility_rules": {
      "min_age": 18,
      "max_age": 120,
      "income_limit": null,
      "occupation": "Woman"
    },
    "benefits": [
      "Interest-free microcredit business loans up to ₹1,00,000.",
      "Financial literacy and asset planning training.",
      "Skills programs in sewing, farming technology, and electronics."
    ],
    "required_documents": [
      "Aadhaar Card",
      "Self-Help Group Certificate",
      "Address Proof",
      "Bank Account Passbook"
    ],
    "application_steps": [
      "Join or log into an active Self-Help Group (SHG).",
      "Apply through the Block Development Office or SHG federations.",
      "Submit business proposal guidelines and get project clearance."
    ],
    "official_link": "https://lakhpatididi.gov.in",
    "source_link": "https://lakhpatididi.gov.in",
    "last_verified_date": "2026-07-04",
    "summary_text": "Lakhpati Didi is a social empowerment scheme helping women in self-help groups earn a sustainable income of at least ₹1 Lakh per year through skills training and credit access.",
    "embedding": [],
    "version_history": [],
    "tags": [
      "women",
      "livelihood",
      "finance",
      "business loan",
      "self help group"
    ]
  },
  {
    "scheme_name": "Mahila Samman Savings Certificate",
    "category": "Women",
    "level": "Central",
    "state_applicability": [
      "All"
    ],
    "eligibility_rules": {
      "min_age": 10,
      "max_age": 120,
      "income_limit": null,
      "occupation": "Woman"
    },
    "benefits": [
      "Highly competitive fixed interest rate of 7.5% per annum.",
      "Flexible deposit options up to ₹2,00,000 for a 2-year tenure.",
      "Partial withdrawal facility allowed up to 40% after one year."
    ],
    "required_documents": [
      "Aadhaar Card",
      "PAN Card",
      "KYC Forms",
      "Post Office Bank Deposit details"
    ],
    "application_steps": [
      "Visit any authorized Post Office or nationalized bank branch.",
      "Fill out the Mahila Samman Savings Certificate application forms.",
      "Deposit the savings amount (up to ₹2 Lakh) to activate the account."
    ],
    "official_link": "https://www.indiapost.gov.in",
    "source_link": "https://www.indiapost.gov.in",
    "last_verified_date": "2026-07-04",
    "summary_text": "Mahila Samman Savings Certificate is a government-backed small savings scheme designed to encourage savings among women and girls by offering competitive interest rates and safety.",
    "embedding": [],
    "version_history": [],
    "tags": [
      "women",
      "savings",
      "interest rates",
      "financial safety",
      "post office"
    ]
  },
  {
    "scheme_name": "Pradhan Mantri Ujjwala Yojana 2.0",
    "category": "Social Welfare",
    "level": "Central",
    "state_applicability": [
      "All"
    ],
    "eligibility_rules": {
      "min_age": 18,
      "max_age": 120,
      "income_limit": null,
      "occupation": "Woman"
    },
    "benefits": [
      "Deposit-free LPG connection including a filled gas cylinder.",
      "Free first stove (hotplate) and regulatory components.",
      "Refill loan facility available to ease initial gas cylinder refills."
    ],
    "required_documents": [
      "Aadhaar Card",
      "BPL Ration Card",
      "Address Proof",
      "Bank Account Details"
    ],
    "application_steps": [
      "Apply online via the PM Ujjwala portal or visit any LPG distributor.",
      "Submit KYC details along with active BPL certificate numbers.",
      "Verify family member documentation and collect the cylinder set."
    ],
    "official_link": "https://www.pmuy.gov.in",
    "source_link": "https://www.pmuy.gov.in",
    "last_verified_date": "2026-07-04",
    "summary_text": "Pradhan Mantri Ujjwala Yojana (PMUY) provides clean cooking fuel connections to women from economically backward and disadvantaged households to secure health and livelihood quality.",
    "embedding": [],
    "version_history": [],
    "tags": [
      "women",
      "clean fuel",
      "lpg connection",
      "disadvantaged",
      "social welfare"
    ]
  },
  {
    "scheme_name": "STEP (Support to Training and Employment Programme for Women)",
    "category": "Women",
    "level": "Central",
    "state_applicability": [
      "All"
    ],
    "eligibility_rules": {
      "min_age": 16,
      "max_age": 65,
      "income_limit": null,
      "occupation": "Woman"
    },
    "benefits": [
      "Skills training in agricultural, tailoring, IT, and handicrafts sectors.",
      "Facilitates self-employment loans and startup grants.",
      "Enhances direct employment capability through cooperative clusters."
    ],
    "required_documents": [
      "Aadhaar Card",
      "Age Proof",
      "Self-Declaration of income",
      "Address Details"
    ],
    "application_steps": [
      "Apply through participating NGO coordinators, state social boards, or STEP centers.",
      "Select a training stream and complete regular attendance.",
      "Receive skill certification and credit linkage support."
    ],
    "official_link": "https://wcd.nic.in",
    "source_link": "https://wcd.nic.in",
    "last_verified_date": "2026-07-04",
    "summary_text": "STEP aims to provide training for self-reliance and employability to women, especially those in rural or marginalized circumstances, across sectors like agriculture, IT, and tailoring.",
    "embedding": [],
    "version_history": [],
    "tags": [
      "women",
      "employment",
      "skills development",
      "training",
      "welfare"
    ]
  },
  {
    "scheme_name": "Pradhan Mantri Silai Machine Yojana",
    "category": "Social Welfare",
    "level": "Central",
    "state_applicability": [
      "All"
    ],
    "eligibility_rules": {
      "min_age": 20,
      "max_age": 40,
      "income_limit": 120000,
      "occupation": "Woman"
    },
    "benefits": [
      "Free sewing machine or cash subsidy of ₹5,000 for purchasing one.",
      "Provides basic tailoring training support.",
      "Helps women initiate self-employment tailoring units from home."
    ],
    "required_documents": [
      "Aadhaar Card",
      "Income Certificate",
      "Age Proof",
      "Passport Size Photos"
    ],
    "application_steps": [
      "Download the Silai Machine application form from official state portals.",
      "Fill in details and attach the income and age verification proof.",
      "Submit the application to local block officers or welfare departments."
    ],
    "official_link": "https://india.gov.in",
    "source_link": "https://india.gov.in",
    "last_verified_date": "2026-07-04",
    "summary_text": "PM Free Sewing Machine scheme provides sewing machines to financially weaker women in rural and urban areas to help them establish home-based tailoring startups.",
    "embedding": [],
    "version_history": [],
    "tags": [
      "women",
      "sewing machine",
      "tailoring",
      "livelihood support",
      "self employment"
    ]
  },
  {
    "scheme_name": "Mahila E-Haat",
    "category": "Women",
    "level": "Central",
    "state_applicability": [
      "All"
    ],
    "eligibility_rules": {
      "min_age": 18,
      "max_age": 120,
      "income_limit": null,
      "occupation": "Woman"
    },
    "benefits": [
      "Direct digital marketing platform to display and sell handmade items.",
      "Zero transaction commission or listing fees for women sellers.",
      "Provides national customer reach and business logistics training."
    ],
    "required_documents": [
      "Aadhaar Card",
      "SHG or Self-Help certification",
      "Product Photos",
      "Bank Details"
    ],
    "application_steps": [
      "Register as a vendor on the Mahila E-Haat portal.",
      "Upload product listings, description details, and pricing sheets.",
      "Fulfill incoming customer orders directly using verified shipping lines."
    ],
    "official_link": "http://mahilaehaat-wcd.gov.in",
    "source_link": "http://mahilaehaat-wcd.gov.in",
    "last_verified_date": "2026-07-04",
    "summary_text": "Mahila E-Haat is a direct online marketing platform launched by the Ministry of Women and Child Development to facilitate women entrepreneurs and self-help groups.",
    "embedding": [],
    "version_history": [],
    "tags": [
      "women",
      "e-commerce",
      "business",
      "handicrafts",
      "entrepreneurship"
    ]
  }
];

let addedCount = 0;
additions.forEach((newScheme) => {
  const exists = schemes.some((s) => s.scheme_name.toLowerCase() === newScheme.scheme_name.toLowerCase());
  if (!exists) {
    schemes.push(newScheme);
    addedCount++;
  }
});

if (addedCount > 0) {
  fs.writeFileSync(schemesPath, JSON.stringify(schemes, null, 2), "utf-8");
  console.log(`✅ Appended ${addedCount} new schemes to schemes.json!`);
} else {
  console.log("ℹ All schemes are already present in schemes.json.");
}
