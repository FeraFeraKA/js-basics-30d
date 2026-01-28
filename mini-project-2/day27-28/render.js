import { filterNotes, formatDate, notesState } from "./utils.js";

let els = null;
let state = null;

export function initRender(_els, _state) {
  els = _els;
  state = _state;
}

function createCard(note) {
  const card = document.createElement("div");
  card.classList.add("notes_card");
  card.dataset.id = note.id;

  const title = document.createElement("h2");
  title.classList.add("notes_title");
  title.textContent = note.title;

  const text = document.createElement("p");
  text.classList.add("notes_text");
  text.textContent = note.text;

  const createdTime = document.createElement("p");
  createdTime.classList.add("notes_created_time");
  const createdAt = formatDate(note.createdAt);
  createdTime.textContent = "Created: " + createdAt;

  const updatedTime = document.createElement("p");
  updatedTime.classList.add("notes_updated_time");
  const updatedAt = formatDate(note.updatedAt);
  updatedTime.textContent = createdAt !== updatedAt ? "Updated: " + updatedAt : "Updated: —";

  const notesActions = document.createElement("div");
  notesActions.classList.add("notes_actions");
  notesActions.hidden = state.editingId === note.id;

  const buttonEdit = document.createElement("button");
  buttonEdit.dataset.action = "edit";
  buttonEdit.textContent = "Edit";

  const buttonDelete = document.createElement("button");
  buttonDelete.dataset.action = "delete";
  buttonDelete.textContent = "Delete";

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("notes_change_container");
  cardContainer.hidden = state.editingId !== note.id;

  const titleInput = document.createElement("input");
  titleInput.classList.add("notes_change_title");
  titleInput.placeholder = "Title...";
  titleInput.value = note.title;

  const textInput = document.createElement("input");
  textInput.classList.add("notes_change_text");
  textInput.placeholder = "Text...";
  textInput.value = note.text;

  const changeActions = document.createElement("div");
  changeActions.classList.add("notes_change_actions");

  const buttonSave = document.createElement("button");
  buttonSave.dataset.action = "save";
  buttonSave.textContent = "Save";

  const buttonCancel = document.createElement("button");
  buttonCancel.dataset.action = "cancel";
  buttonCancel.textContent = "Cancel";

  card.append(title);
  card.append(text);
  card.append(createdTime);
  card.append(updatedTime);
  notesActions.append(buttonEdit);
  notesActions.append(buttonDelete);
  card.append(notesActions);
  cardContainer.append(titleInput);
  cardContainer.append(textInput);
  changeActions.append(buttonSave);
  changeActions.append(buttonCancel);
  cardContainer.append(changeActions);
  card.append(cardContainer);
  return card;
}

function createLine() {
  const line = document.createElement("span");
  line.classList.add("notes_line");
  return line;
}

export function render() {
  els.notesList.innerHTML = '<span class="notes_line"></span>';
  els.notesError.textContent = state.error;
  const filteredNotes = filterNotes(state.notes, state.sorting, state.filtering);
  els.notesState.textContent = notesState(state.notes, filteredNotes);
  for (const note of filteredNotes) {
    const card = createCard(note);
    const line = createLine();
    els.notesList.append(card);
    els.notesList.append(line);
  }
}

export function deleteCard(id) {
  const card = els.notesList.querySelector(`.notes_card[data-id="${id}"]`);
  if (!card) return;

  card.nextElementSibling?.classList.contains("notes_line") && card.nextElementSibling.remove();
  card.remove();
}
