export function initHandlers(els, actions, render) {
  els.btnPlus.addEventListener("click", () => {
    actions.incrementCounter();
    actions.saveState();
    render();
  });

  els.btnMinus.addEventListener("click", () => {
    actions.decrementCounter();
    actions.saveState();
    render();
  });

  els.btnReset.addEventListener("click", () => {
    actions.resetCounter();
    actions.saveState();
    render();
  });

  els.btnAdd.addEventListener("click", () => {
    actions.changeInputText(els.listInput.value);
    const bool = actions.addItem();
    if (bool) actions.saveState();
    render();
  });

  els.listInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      actions.changeInputText(els.listInput.value);
      const bool = actions.addItem();
      if (bool) actions.saveState();
      render();
    }
  });

  els.listInput.addEventListener("input", () => {
    actions.changeInputText(els.listInput.value);
    actions.checkError();
    render();
  });

  els.searchInput.addEventListener("input", () => {
    const value = els.searchInput.value;
    actions.changeQuery(value);
    actions.saveState();
    render();
  });

  els.listUl.addEventListener("click", (event) => {
    if (!event.target.closest(".btn-delete")) return;
    const id = event.target.closest("li").dataset.id;
    actions.removeItem(id);
    actions.saveState();
    render();
  });
}
