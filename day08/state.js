import { checkValidation } from "./utils.js";

export let state = {
  count: 0,
  items: [],
  query: "",
  error: "",
};

export function saveState() {
  const jsonString = JSON.stringify(state);
  localStorage.setItem("state", jsonString);
}

export function loadState() {
  const receivedString = localStorage.getItem("state");
  if (receivedString) state = JSON.parse(receivedString);
}

export function addItem(value) {
  const trimmed = value.trim();
  state.error = checkValidation(trimmed);
  if (state.error !== "") {
    return;
  }
  const obj = {};
  obj.id = crypto.randomUUID();
  obj.text = trimmed;
  state.items = [...state.items, obj];
}

export function removeItem(id) {
  state.items = state.items.filter((obj) => obj.id !== id);
}

export function incrementCounter() {
  state.count += 1;
}

export function decrementCounter() {
  state.count -= 1;
}

export function resetCounter() {
  state.count = 0;
  state.items = [];
}

export function checkError(value) {
  const trimmed = value.trim();
  state.error = checkValidation(trimmed);
}

export function changeQuery(value) {
  state.query = value;
}
