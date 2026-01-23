export let state = {
  products: [],
  status: "idle",
  error: "",
  query: "",
  category: "all",
  pageSize: 8,
  visibleCount: 8,
};

export function mergeItems(products) {
  state.products = products;
}

export function setQuery(query) {
  state.query = query;
  state.visibleCount = state.pageSize;
}

export function setCategory(category) {
  state.category = category;
  state.visibleCount = state.pageSize;
}

export function resetState() {
  state.query = "";
  state.category = "all";
  state.visibleCount = state.pageSize;
}

export function addCount() {
  state.visibleCount += state.pageSize;
  if (state.visibleCount > state.products.length) state.visibleCount = state.products.length;
}
