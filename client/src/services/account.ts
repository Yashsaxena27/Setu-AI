import { api } from "./api";

export function deleteAccount() {
  return api("/auth/delete", {
    method: "DELETE",
  });
}