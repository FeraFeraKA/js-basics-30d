import { render } from "./render.js";
import { fetchItems } from "./api.js";
import { resetState, setCategory, setQuery, state } from "./state.js";
import { initHandlers } from "./handlers.js";

const els = {
  catalog: document.querySelector(".catalog__cards"),
  requestStatus: document.querySelector(".request__status"),
  requestError: document.querySelector(".request__error"),
  query: document.querySelector(".catalog__query"),
  category: document.querySelector(".catalog__select"),
  reset: document.querySelector(".catalog__reset"),
};

const actions = {
  setQuery,
  setCategory,
  resetState,
};

async function init() {
  try {
    await fetchItems();
  } catch {
    console.log("Error");
  } finally {
    render(els, state);
  }
}

init();
initHandlers(els, actions, () => {
  render(els, state);
});
render(els, state);
