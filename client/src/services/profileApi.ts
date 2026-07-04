import API from "../services/api";

export async function saveProfile(profile: any) {
  const response = await fetch(`${API}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  return response.json();
}