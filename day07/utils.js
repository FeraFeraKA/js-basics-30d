export function getFilteredItems(items, query) {
  const q = query.trim().toLowerCase();
  return q === ""
    ? items
    : items.filter((n) => n.text.toLowerCase().includes(q));
}

export function getStats(items, filteredItems) {
  const total = items.length;
  const visible = filteredItems.length;
  return { total, visible };
}

export function checkValidation(value) {
  if (value === "" || value.length > 80)
    return "Строка пустая или слишком длинная";
  return "";
}
