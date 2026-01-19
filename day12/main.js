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
import { fetchItems, timeoutPromise } from "./api.js";

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

let isLoading = true;
let loadError = "";

loadState();
render(els, state, { isLoading, loadError });
initHandlers(els, actions, () => render(els, state, { isLoading, loadError }));
Promise.race([fetchItems(), timeoutPromise(15000)])
  .then(() => {
    isLoading = false;
    render(els, state, { isLoading, loadError });
  })
  .catch(() => {
    isLoading = false;
    loadError = "Не удалось получить доступ к API";
    render(els, state, { isLoading, loadError });
  });
