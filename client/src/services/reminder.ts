import { api } from "./api";

export function getReminders() {
  return api("/reminders");
}

export function createReminder(data: any) {
  return api("/reminders", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateReminder(id: string, data: any) {
  return api(`/reminders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteReminder(id: string) {
  return api(`/reminders/${id}`, {
    method: "DELETE",
  });
}