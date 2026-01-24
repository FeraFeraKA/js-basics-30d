export function initHandlers(els, actions, renderCards, renderModal) {
  let timerId = null;

  function onEscKeydown(event) {
    if (event.key !== "Escape") return;
    actions.closeModal();
    document.removeEventListener("keydown", onEscKeydown);
    renderModal();
  }

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
      actions.saveFavorites();
      renderCards();
      return;
    }
    const element = document.activeElement;
    actions.openModal(id, element);
    document.addEventListener("keydown", onEscKeydown);
    renderModal();
  });

  els.modalOverlay.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) return;
    actions.closeModal();
    document.removeEventListener("keydown", onEscKeydown);
    renderModal();
  });

  els.modalClose.addEventListener("click", () => {
    actions.closeModal();
    document.removeEventListener("keydown", onEscKeydown);
    renderModal();
  });
}
