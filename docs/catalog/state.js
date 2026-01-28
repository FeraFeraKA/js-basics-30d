const FAVORITES_KEY = "catalog:favorites:v1";

export let state = {
  products: [],
  status: "idle",
  error: "",
  query: "",
  category: "all",
  pageSize: 5,
  visibleCount: 5,
  favorites: [],
  modalProductId: null,
  lastActiveElement: null,
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

export function addFavorites(id) {
  if (state.favorites.includes(id))
    state.favorites = state.favorites.filter((favId) => favId !== id);
  else state.favorites = [...state.favorites, id];
}

export function openModal(id, element) {
  state.modalProductId = id;
  state.lastActiveElement = element;
}

export function closeModal() {
  state.modalProductId = null;
}

export function saveFavorites() {
  const favorites = JSON.stringify(state.favorites);
  localStorage.setItem(FAVORITES_KEY, favorites);
}

export function loadFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  if (raw === null) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    parsed.forEach((id) => {
      state.favorites = [...state.favorites, Number(id)];
    });
  } catch {
    return [];
  }
}
