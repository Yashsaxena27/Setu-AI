import { api } from "./api";

export function saveProfile(profile: any) {
  return api("/profile", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}