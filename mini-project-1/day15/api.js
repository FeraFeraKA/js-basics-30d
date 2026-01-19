import { state, mergeItems } from "./state.js";

const URL = "https://fakestoreapi.com/products";

export async function fetchItems() {
  const controller = new AbortController();
  const timeoutID = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    state.status = "loading";
    state.error = "";
    const response = await fetch(URL, { signal: controller.signal });

    if (!response.ok) {
      throw new Error("Network code was not ok:" + response.statusText);
    }

    const products = await response.json();

    mergeItems(
      products.map((n) => ({
        id: n.id,
        title: n.title,
        price: n.price,
        description: n.description,
        category: n.category,
        image: n.image,
        rating: n.rating,
      })),
    );
    state.status = "success";
  } catch (err) {
    state.status = "error";
    state.error = err.name === "AbortError" ? "Вышло время доступа к API" : err.name;
    throw err;
  } finally {
    clearTimeout(timeoutID);
  }
}
