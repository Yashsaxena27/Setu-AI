import API from "./api";

export async function getMatches(profile: any) {
  const response = await fetch(`${API}/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  return response.json();
}