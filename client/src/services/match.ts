import { api } from "./api";

interface MatchResponse {
  matches: any[];
}

export function getMatches(profile: any) {
  return api<MatchResponse>("/match", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}