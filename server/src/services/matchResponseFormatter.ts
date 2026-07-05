export const formatMatchResponse = (matches: any[]) => {
  return matches.map((scheme) => ({
    _id: scheme._id,
    scheme_name: scheme.scheme_name,
    category: scheme.category,
    score: Number((scheme.score * 100).toFixed(1)),
    summary: scheme.summary_text,
    benefits: scheme.benefits,
    documents: scheme.required_documents,
    official_link: scheme.official_link,
  }));
};