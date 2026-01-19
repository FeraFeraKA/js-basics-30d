import { state, mergeItems } from "./state.js";

const URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchItems() {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);
  try {
    state.requestStatus = "loading";
    state.requestError = "";
    const response = await fetch(URL, { signal: controller.signal });

    if (!response.ok) {
      throw new Error("Network code was not ok: " + response.statusText);
    }

    const posts = await response.json();

    let arr = [];
    posts.forEach((post) => {
      arr.push({ id: post.id, text: post.title });
    });
    mergeItems(arr);
    state.requestStatus = "success";
  } catch (err) {
    state.requestStatus = "error";
    state.requestError = err.name === "AbortError" ? "Время запроса к API вышло" : err.message;
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
