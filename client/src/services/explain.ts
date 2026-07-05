import { api } from "./api";

interface ExplanationResponse {
  explanation: string;
}

export function getExplanation(
  schemeId: string,
  profile: any
) {
  return api<ExplanationResponse>(`/explain/${schemeId}`, {
    method: "POST",
    body: JSON.stringify(profile),
  });
}