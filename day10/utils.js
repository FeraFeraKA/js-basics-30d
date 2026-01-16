export function getFilteredItems(items, query) {
  const q = query.trim().toLowerCase();
  return q === "" ? items : items.filter((n) => n.text.toLowerCase().includes(q));
}

export function getStats(items, filteredItems) {
  const total = items.length;
  const visible = filteredItems.length;
  return { total, visible };
}

export function checkValidation(value) {
  if (value === "" || value.length > 80) return "Строка пустая или слишком длинная";
  return "";
}

export function renderEmptyState(items, visible) {
  if (items.length === 0) {
    return "Список пуст";
  } else if (items.length > 0 && visible.length === 0) {
    return "Ничего не найдено";
  }
  return "";
}

export function getKey(items) {
  let str = "";
  for (const item of items) {
    str += `id:${item.id}|text:${item.text}`;
  }
  return str;
}

export function getFlags(state) {
  return {
    canAddItem: state.inputText.trim() !== "" && state.error === "",
    canReset: !(state.count === 0 && state.items.length === 0),
  };
}
