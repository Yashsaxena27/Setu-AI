export const formatMatchResponse = (matches: any[]) => {
  return matches.map((scheme) => ({
    _id: scheme._id,
    scheme_name: scheme.scheme_name,
    category: scheme.category,
    level: scheme.level,
    score: Number((scheme.score * 100).toFixed(1)),
    summary: scheme.summary_text,
    state_applicability: scheme.state_applicability,
    eligibility_rules: scheme.eligibility_rules,
    benefits: scheme.benefits,
    required_documents: scheme.required_documents,
    official_link: scheme.official_link,
  }));
};