import {
  getStatus,
  filterProducts as getFilteredProducts,
  getVisibleProducts,
  getCategories,
  capitalizeWord,
  canLoadMore,
} from "./utils.js";

export function renderCards(els, state) {
  els.catalog.innerHTML = "";
  els.category.innerHTML = "";
  els.requestStatus.textContent = getStatus(state.status);
  els.requestError.textContent = state.error;
  const filteredProducts = getFilteredProducts(state.products, state.query, state.category);
  const visibleProducts = getVisibleProducts(filteredProducts, state.visibleCount);
  const categories = getCategories(state.products);
  for (const product of visibleProducts) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = product.id;

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card__wrapper");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card__image");
    cardImage.src = product.image;

    const cardTitle = document.createElement("p");
    cardTitle.classList.add("card__title");
    cardTitle.textContent = product.title;

    const cardPrice = document.createElement("p");
    cardPrice.classList.add("card__price");
    cardPrice.textContent = "Price: " + product.price + "$";

    const cardCategory = document.createElement("p");
    cardCategory.classList.add("card__category");
    cardCategory.textContent = "Category: " + product.category;

    const cardRating = document.createElement("p");
    cardRating.classList.add("card__rating");
    cardRating.textContent = "Rate: " + product.rating.rate;

    const cardFavorite = document.createElement("button");
    cardFavorite.classList.add("card__favorite");
    if (state.favorites.includes(product.id)) cardFavorite.classList.add("is-active");

    const cardSpan = document.createElement("span");
    cardSpan.textContent = state.favorites.includes(product.id)
      ? "In favorite"
      : "Mark as favorite";

    cardWrapper.append(cardImage);
    cardFavorite.append(cardSpan);
    card.append(cardWrapper);
    card.append(cardTitle);
    card.append(cardPrice);
    card.append(cardCategory);
    card.append(cardRating);
    card.append(cardFavorite);
    els.catalog.append(card);
  }

  els.more.hidden = !canLoadMore(filteredProducts, visibleProducts);

  const option = document.createElement("option");
  option.value = "all";
  option.textContent = "All";
  els.category.append(option);
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = capitalizeWord(category);
    els.category.append(option);
  }
  els.category.value = state.category;
}

export function renderModal(els, state) {
  if (state.modalProductId === null) els.modalOverlay.hidden = true;
  else {
    const product = state.products.find((item) => item.id === state.modalProductId);
    els.modalImage.src = product.image;
    els.modalTitle.textContent = product.title;
    els.modalPrice.textContent = "Price: " + product.price;
    els.modalDescription.textContent = product.description;
    els.modalCategory.textContent = "Category: " + product.category;
    els.modalRating.textContent = "Rate: " + product.rating.rate;
    els.modalOverlay.hidden = false;
  }
}
