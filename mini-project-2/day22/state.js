export let state = {
  notes: [],
  error: "",
  editingId: null,
  queryTitle: "",
  queryText: "",
};

export function addNote(title, text) {
  if (typeof title !== "string" || typeof text !== "string") {
    state.error = "Неверный тип данных";
    return;
  }
  if (title === "" || text === "") {
    state.error = "Нельзя создать пустую заметку";
    return;
  }
  state.error = "";
  const note = {
    title: title,
    text: text,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  state.notes = [...state.notes, note];
  return true;
}

export function deleteNote(id) {
  state.notes = state.notes.filter((note) => String(note.id) !== String(id));
}

export function startEditNote(id) {
  state.editingId = id;
}

export function updateNote(title, text, id) {
  if (typeof title !== "string" || typeof text !== "string") {
    state.error = "Неверный тип данных";
    state.queryTitle = title;
    state.queryText = text;
    return;
  }
  if (title === "" || text === "") {
    state.error = "Нельзя сохранить пустой текст";
    state.queryTitle = title;
    state.queryText = text;
    return;
  }
  state.error = "";
  const note = state.notes.find((note) => note.id === id);
  note.title = title;
  note.text = text;
  note.updatedAt = new Date();
  return true;
}

export function endEditNote() {
  state.editingId = null;
  state.queryTitle = "";
  state.queryText = "";
}
