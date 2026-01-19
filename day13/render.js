import {
  getFilteredItems,
  getStats,
  renderEmptyState,
  getKey,
  getFlags,
  getStatusAPI,
} from "./utils.js";

let lastKey = "";

export function render(els, state) {
  els.listInput.value = state.inputText;
  els.countSpan.textContent = state.count;
  els.api.textContent = getStatusAPI(state.requestStatus);

  const filteredItems = getFilteredItems(state.items, state.query);

  const stats = getStats(state.items, filteredItems);
  els.total.textContent = stats.total;
  els.visible.textContent = stats.visible;

  const emptyState = renderEmptyState(state.items, filteredItems);
  els.currentState.textContent = emptyState;

  els.current.textContent = "Текущие элементы:";
  els.current.hidden = emptyState !== "";

  els.error.textContent = state.requestError || state.error;

  const nextKey = getKey(filteredItems);

  const { canAddItem, canReset } = getFlags(state);

  els.btnAdd.disabled = !canAddItem;
  els.btnReset.disabled = !canReset;

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
