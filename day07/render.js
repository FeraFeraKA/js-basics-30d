import { getFilteredItems, getStats } from "./utils.js";

export function render(els, state) {
  els.countSpan.textContent = state.count;

  const filteredItems = getFilteredItems(state.items, state.query);

  const stats = getStats(state.items, filteredItems);
  els.total.textContent = stats.total;
  els.visible.textContent = stats.visible;

  els.error.textContent = state.error;

  els.listUl.innerHTML = "";

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
