import {
  getFilteredItems,
  getStats,
  renderEmptyState,
  renderCurrent,
  getKey,
} from "./utils.js";

let lastKey = "";

export function render(els, state) {
  els.countSpan.textContent = state.count;

  const filteredItems = getFilteredItems(state.items, state.query);

  const stats = getStats(state.items, filteredItems);
  els.total.textContent = stats.total;
  els.visible.textContent = stats.visible;

  const emptyState = renderEmptyState(state.items, filteredItems);
  els.currentState.textContent = emptyState;

  els.current.textContent = renderCurrent(emptyState);

  els.error.textContent = state.error;

  const nextKey = getKey(filteredItems);

  if (nextKey == lastKey) return;

  els.listUl.innerHTML = "";
  lastKey = nextKey;

  for (const item of filteredItems) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("btn-delete");
    button.textContent = "Delete";
    li.dataset.id = item.id;
    li.textContent = item.text;
    li.append(button);
    els.listUl.append(li);
  }
}
