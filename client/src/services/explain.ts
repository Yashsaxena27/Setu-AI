import API from "./api";

export async function getExplanation(
  schemeId: string,
  profile: any
) {
  const response = await fetch(
    `${API}/explain/${schemeId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch explanation");
  }

  return response.json();
}