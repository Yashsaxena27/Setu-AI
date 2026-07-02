const BASE_URL = "http://localhost:5000";

export async function saveProfile(profile: any) {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  return response.json();
}