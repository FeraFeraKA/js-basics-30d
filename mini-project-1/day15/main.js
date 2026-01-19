import { render } from "./render.js";
import { fetchItems } from "./api.js";
import { state } from "./state.js";

const els = {
  catalog: document.querySelector(".catalog__cards"),
  requestStatus: document.querySelector(".request__status"),
  requestError: document.querySelector(".request__error"),
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
render(els, state);
