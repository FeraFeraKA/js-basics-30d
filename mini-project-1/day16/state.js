export let state = {
  products: [],
  status: "idle",
  error: "",
  query: "",
  category: "all",
};

export function mergeItems(products) {
  state.products = products;
}

export function setQuery(query) {
  state.query = query;
}

export function setCategory(category) {
  state.category = category;
}

export function resetState() {
  state.query = "";
  state.category = "all";
}
