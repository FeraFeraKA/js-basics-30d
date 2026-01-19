export let state = {
  products: [],
  status: "idle",
  error: "",
};

export function mergeItems(products) {
  state.products = products;
}
