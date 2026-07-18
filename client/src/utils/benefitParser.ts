interface Scheme {
  benefits?: string[];
}

export interface BenefitSummary {
  maxMonetary: number;
  categories: string[];
}

export function parseBenefitImpact(schemes: Scheme[]): BenefitSummary {
  let maxMonetary = 0;
  const categoriesSet = new Set<string>();

  schemes.forEach((scheme) => {
    if (!scheme.benefits) return;

    scheme.benefits.forEach((benefit) => {
      // Find numerical monetary amounts (e.g., ₹6,000 or ₹5,00,000)
      const matches = benefit.match(/(?:₹|Rs\.?|INR)\s*([\d,]+)/gi);
      if (matches) {
        matches.forEach((m) => {
          const numMatch = m.match(/[\d,]+/);
          if (numMatch) {
            const val = parseFloat(numMatch[0].replace(/,/g, ""));
            if (!isNaN(val)) {
              // Accumulate explicit benefits
              maxMonetary += val;
            }
          }
        });
      }

      // Categorize
      const lower = benefit.toLowerCase();
      if (lower.includes("loan") || lower.includes("credit") || lower.includes("interest")) {
        categoriesSet.add("Loan Assistance");
      }
      if (lower.includes("health") || lower.includes("insurance") || lower.includes("medical")) {
        categoriesSet.add("Health Coverage");
      }
      if (lower.includes("scholarship") || lower.includes("tuition") || lower.includes("education")) {
        categoriesSet.add("Education Support");
      }
      if (lower.includes("transfer") || lower.includes("allowance") || lower.includes("pension") || lower.includes("stipend") || lower.includes("cash")) {
        categoriesSet.add("Direct Transfers");
      }
      if (lower.includes("subsidy") || lower.includes("subsidized")) {
        categoriesSet.add("Subsidies");
      }
      if (lower.includes("training") || lower.includes("skill") || lower.includes("placement")) {
        categoriesSet.add("Training Support");
      }
    });
  });

  return {
    maxMonetary,
    categories: Array.from(categoriesSet),
  };
}
