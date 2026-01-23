import { renderCards, renderModal } from "./render.js";
import { fetchItems } from "./api.js";
import {
  addCount,
  addFavorites,
  closeModal,
  openModal,
  resetState,
  setCategory,
  setQuery,
  state,
} from "./state.js";
import { initHandlers } from "./handlers.js";

const els = {
  catalog: document.querySelector(".catalog__cards"),
  requestStatus: document.querySelector(".request__status"),
  requestError: document.querySelector(".request__error"),
  query: document.querySelector(".catalog__query"),
  category: document.querySelector(".catalog__select"),
  reset: document.querySelector(".catalog__reset"),
  more: document.querySelector(".catalog__more"),
  modalOverlay: document.querySelector(".modal-overlay"),
  modalClose: document.querySelector(".modal__close"),
  modalImage: document.querySelector(".modal__image"),
  modalTitle: document.querySelector(".modal__title"),
  modalPrice: document.querySelector(".modal__price"),
  modalDescription: document.querySelector(".modal__description"),
  modalCategory: document.querySelector(".modal__category"),
  modalRating: document.querySelector(".modal__rating"),
};

const actions = {
  setQuery,
  setCategory,
  resetState,
  addCount,
  addFavorites,
  openModal,
  closeModal,
};

async function init() {
  try {
    await fetchItems();
  } catch {
    console.log("Error");
  } finally {
    renderModal(els, state);
    renderCards(els, state);
    els.query.focus();
  }
}

init();
initHandlers(
  els,
  actions,
  () => {
    renderCards(els, state);
  },
  () => {
    renderModal(els, state);
  },
);
renderModal(els, state);
renderCards(els, state);
