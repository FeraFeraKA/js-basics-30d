import { state, addNote, deleteNote, startEditNote, updateNote, endEditNote } from "./state.js";
import { initHandlers } from "./handlers.js";
import { render } from "./render.js";

const els = {
  notesError: document.querySelector(".notes_error"),
  notesInputTitle: document.querySelector(".notes_input_title"),
  notesInputText: document.querySelector(".notes_input_text"),
  notesAdd: document.querySelector(".notes_add"),
  notesList: document.querySelector(".notes_list"),
  notesAdding: document.querySelector(".notes_adding"),
};

const actions = {
  addNote,
  deleteNote,
  startEditNote,
  updateNote,
  endEditNote,
};

initHandlers(els, actions, () => {
  render(els, state);
});
render(els, state);
