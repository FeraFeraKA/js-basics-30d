import { mergeItems } from "./state.js";

export async function fetchItems() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) throw new Error("Network code was not ok: " + response.statusText);
      return response.json();
    })
    .then((posts) => {
      let arr = [];
      posts.forEach((post) => {
        arr.push({ id: post.id, text: post.title });
      });
      mergeItems(arr);
    });
}

export async function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Не удалось получить доступ к API"));
    }, ms);
  });
}
