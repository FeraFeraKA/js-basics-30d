export function initHandlers(els, actions, render) {
  let timerId = null;

  els.query.addEventListener("input", () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      actions.setQuery(els.query.value);
      render();
    }, 300);
  });

  els.category.addEventListener("change", () => {
    actions.setCategory(els.category.value);
    render();
  });

  els.reset.addEventListener("click", () => {
    clearTimeout(timerId);
    els.query.value = "";
    actions.resetState();
    els.category.value = "all";
    render();
  });
}
