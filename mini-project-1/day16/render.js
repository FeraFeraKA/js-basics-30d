import { getStatus, filterProducts, getCategories, capitalizeWord } from "./utils.js";

export function render(els, state) {
  els.catalog.innerHTML = "";
  els.category.innerHTML = "";
  els.requestStatus.textContent = getStatus(state.status);
  els.requestError.textContent = state.error;
  const filteredProducts = filterProducts(state.products, state.query, state.category);
  const categories = getCategories(state.products);
  for (const product of filteredProducts) {
    const card = document.createElement("div");
    card.classList.add("card");

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

    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card__description");
    cardDescription.textContent = product.description;

    const cardCategory = document.createElement("p");
    cardCategory.classList.add("card__category");
    cardCategory.textContent = "Category: " + product.category;

    const cardRating = document.createElement("p");
    cardRating.classList.add("card__rating");
    cardRating.textContent = "Rate: " + product.rating.rate;

    cardWrapper.append(cardImage);
    card.append(cardWrapper);
    card.append(cardTitle);
    card.append(cardPrice);
    card.append(cardDescription);
    card.append(cardCategory);
    card.append(cardRating);
    els.catalog.append(card);
  }

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
