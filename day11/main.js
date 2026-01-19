import { render } from "./render.js";
import {
  state,
  loadState,
  saveState,
  addItem,
  removeItem,
  incrementCounter,
  decrementCounter,
  resetCounter,
  checkError,
  changeQuery,
  changeInputText,
} from "./state.js";
import { initHandlers } from "./handlers.js";

const countSpan = document.querySelector(".count");
const listUl = document.querySelector(".list-ul");
const btnPlus = document.querySelector(".btn-plus");
const btnMinus = document.querySelector(".btn-minus");
const btnReset = document.querySelector(".btn-reset");
const btnAdd = document.querySelector(".btn-add");
const listInput = document.querySelector(".list-input");
const searchInput = document.querySelector(".search-input");
const total = document.querySelector(".total");
const visible = document.querySelector(".visible");
const error = document.querySelector(".error");
const current = document.querySelector(".current");
const currentState = document.querySelector(".currentState");

const els = {
  countSpan,
  listUl,
  btnPlus,
  btnMinus,
  btnReset,
  btnAdd,
  listInput,
  searchInput,
  total,
  visible,
  error,
  current,
  currentState,
};

const actions = {
  addItem,
  removeItem,
  incrementCounter,
  decrementCounter,
  resetCounter,
  checkError,
  changeQuery,
  saveState,
  changeInputText,
};

loadState();
initHandlers(els, actions, () => render(els, state));
render(els, state);
