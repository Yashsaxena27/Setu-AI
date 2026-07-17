const API_URL = import.meta.env.VITE_API_URL;

export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}