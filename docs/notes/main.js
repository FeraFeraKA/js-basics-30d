import {
  state,
  addNote,
  deleteNote,
  startEditNote,
  updateNote,
  endEditNote,
  changeSort,
  changeFilter,
  resetSelects,
} from "./state.js";
import { initHandlers } from "./handlers.js";
import { initRender, render } from "./render.js";
import { loadState } from "./persist.js";

const els = {
  notesError: document.querySelector(".notes_error"),
  notesInputTitle: document.querySelector(".notes_input_title"),
  notesInputText: document.querySelector(".notes_input_text"),
  notesAdd: document.querySelector(".notes_add"),
  notesList: document.querySelector(".notes_list"),
  notesAdding: document.querySelector(".notes_adding"),
  notesSort: document.querySelector(".notes_sort"),
  notesFilter: document.querySelector(".notes_filter"),
  notesReset: document.querySelector(".notes_reset"),
  notesState: document.querySelector(".notes_state"),
};

const actions = {
  addNote,
  deleteNote,
  startEditNote,
  updateNote,
  endEditNote,
  changeSort,
  changeFilter,
  resetSelects,
};

initRender(els, state);
initHandlers(els, actions);
loadState();
render();
