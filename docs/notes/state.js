import { saveState } from "./persist.js";

export let state = {
  notes: [],
  error: "",
  editingId: null,
  sorting: "updated-desc",
  filtering: "all",
};

export function addNote(title, text) {
  const trimmedTitle = title.trim();
  const trimmedText = text.trim();
  if (typeof trimmedTitle !== "string" || typeof trimmedText !== "string") {
    state.error = "Неверный тип данных";
    return;
  }
  if (trimmedTitle === "" || trimmedText === "") {
    state.error = "Нельзя создать пустую заметку";
    return;
  }
  state.error = "";
  const note = {
    title: trimmedTitle,
    text: trimmedText,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  state.notes = [...state.notes, note];
  saveState(state.notes);
  return true;
}

export function deleteNote(id) {
  state.notes = state.notes.filter((note) => String(note.id) !== String(id));
  if (state.editingId === id) {
    state.error = "";
    state.editingId = null;
  }
  saveState(state.notes);
}

export function startEditNote(id) {
  state.editingId = id;
}

export function updateNote(title, text, id) {
  const trimmedTitle = title.trim();
  const trimmedText = text.trim();
  if (typeof trimmedTitle !== "string" || typeof trimmedText !== "string") {
    state.error = "Неверный тип данных";
    return;
  }
  if (trimmedTitle === "" || trimmedText === "") {
    state.error = "Нельзя сохранить пустой текст";
    return;
  }
  state.error = "";
  const note = state.notes.find((note) => note.id === id);
  if (!note) return;
  if (note.title === trimmedTitle && note.text === trimmedText) {
    return true;
  }
  note.title = trimmedTitle;
  note.text = trimmedText;
  note.updatedAt = Date.now();
  saveState(state.notes);
  return true;
}

export function endEditNote() {
  state.error = "";
  state.editingId = null;
}

export function changeSort(sorting) {
  state.sorting = sorting;
  state.editingId = null;
}

export function changeFilter(filtering) {
  state.filtering = filtering;
  state.editingId = null;
}

export function resetSelects() {
  state.sorting = "updated-desc";
  state.filtering = "all";
  state.editingId = null;
}
