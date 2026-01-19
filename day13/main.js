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
import { fetchItems } from "./api.js";

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
const api = document.querySelector(".api");

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
  api,
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

async function init() {
  const promise = fetchItems();
  render(els, state);
  try {
    await promise;
  } catch (err) {
    console.log(err);
  } finally {
    render(els, state);
  }
}

loadState();
render(els, state);
initHandlers(els, actions, () => render(els, state));
init();
