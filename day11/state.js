import { checkValidation } from "./utils.js";

export let state = {
  count: 0,
  items: [],
  query: "",
  error: "",
  inputText: "",
  version: 1,
};

const defaultState = {
  count: 0,
  items: [],
  query: "",
  error: "",
  inputText: "",
  version: 1,
};

export function saveState() {
  const persist = {
    count: state.count,
    items: state.items,
    query: state.query,
    version: state.version,
  };
  const jsonString = JSON.stringify(persist);
  localStorage.setItem("state", jsonString);
}

export function loadState() {
  const receivedString = localStorage.getItem("state");
  if (!receivedString) {
    state = defaultState;
    return;
  }
  try {
    const parsed = JSON.parse(receivedString);
    state = {
      ...defaultState,
      ...parsed,
      error: "",
    };
    if (
      typeof state.count !== "number" ||
      !Array.isArray(state.items) ||
      typeof state.query !== "string" ||
      typeof state.version !== "number"
    ) {
      state = defaultState;
      return;
    }
    for (const item of state.items) {
      if (typeof item.id !== "string" || typeof item.text !== "string") {
        state = defaultState;
        return;
      }
    }
  } catch {
    state = defaultState;
  }
}

export function addItem() {
  const trimmed = state.inputText.trim();
  state.error = checkValidation(trimmed);
  if (state.error !== "") {
    return false;
  }
  const obj = {};
  obj.id = crypto.randomUUID();
  obj.text = trimmed;
  state.items = [...state.items, obj];
  state.inputText = "";
  return true;
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

export function checkError() {
  const trimmed = state.inputText.trim();
  state.error = checkValidation(trimmed);
}

export function changeQuery(value) {
  state.query = value;
}

export function changeInputText(value) {
  state.inputText = value;
}

