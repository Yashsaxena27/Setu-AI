import { api } from "./api";

export async function simulateEligibility(
  originalProfile: any,
  simulatedProfile: any
) {
  return api("/simulator", {
    method: "POST",
    body: JSON.stringify({
      originalProfile,
      simulatedProfile,
    }),
  });
}