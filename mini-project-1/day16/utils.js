export function getStatus(status) {
  if (status === "idle") return "";
  if (status === "loading") return "Загрузка...";
  if (status === "error") return "Произошла ошибка: ";
  if (status === "empty") return "Данных нет";
  if (status === "normal") return "Загрузка завершена";
}

export function filterProducts(products, query, category) {
  const q = query.trim().toLowerCase();
  let result = q === "" ? products : products.filter((n) => n.title.toLowerCase().includes(q));
  result = category === "all" ? result : result.filter((n) => n.category === category);
  return result;
}

export function getCategories(products) {
  let categories = new Set();
  products.forEach((product) => {
    categories.add(product.category);
  });
  return categories;
}

export function capitalizeWord(word) {
  return word
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}
