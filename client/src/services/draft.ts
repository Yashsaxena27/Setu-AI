import API from "./api";

export async function generateDraft(
  profile: any,
  scheme: any
) {
  const response = await fetch(`${API}/draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profile,
      scheme,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate draft");
  }

  return response.json();
}