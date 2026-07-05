import { api } from "./api";

interface DraftResponse {
  success: boolean;
  draft: string;
  requiredDocuments: string[];
}

export function generateDraft(
  profile: any,
  scheme: any
) {
  return api<DraftResponse>("/draft", {
    method: "POST",
    body: JSON.stringify({
      profile,
      scheme,
    }),
  });
}