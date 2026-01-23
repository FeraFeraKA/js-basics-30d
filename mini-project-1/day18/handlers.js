export function initHandlers(els, actions, renderCards, renderModal) {
  let timerId = null;

  els.query.addEventListener("input", () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      actions.setQuery(els.query.value);
      renderCards();
    }, 300);
  });

  els.category.addEventListener("change", () => {
    actions.setCategory(els.category.value);
    renderCards();
  });

  els.reset.addEventListener("click", () => {
    clearTimeout(timerId);
    els.query.value = "";
    actions.resetState();
    els.category.value = "all";
    renderCards();
  });

  els.more.addEventListener("click", () => {
    actions.addCount();
    renderCards();
  });

  els.catalog.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;
    const id = Number(card.dataset.id);
    if (event.target.closest(".card__favorite")) {
      actions.addFavorites(id);
      renderCards();
      return;
    }
    actions.openModal(id);
    renderModal();
  });

  els.modalOverlay.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) return;
    actions.closeModal();
    renderModal();
  });

  els.modalClose.addEventListener("click", () => {
    actions.closeModal();
    renderModal();
  });
}
