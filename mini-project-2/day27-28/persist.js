import { state } from "./state.js";

export function saveState(notes) {
  const jsonString = JSON.stringify(notes);
  localStorage.setItem("notes", jsonString);
}

export function loadState() {
  const raw = localStorage.getItem("notes");
  if (raw === null) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    state.notes = parsed;
  } catch {
    return [];
  }
}
