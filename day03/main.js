let state = {
  count: 0,
  items: [],
};

const span = document.querySelector(".count");
const ul = document.querySelector(".list-ul");
const btnPlus = document.querySelector(".btn-plus");
const btnMinus = document.querySelector(".btn-minus");
const btnReset = document.querySelector(".btn-reset");
const btnAdd = document.querySelector(".btn-add");
const input = document.querySelector(".list-input");

function render() {
  span.textContent = state.count;
  ul.innerHTML = "";
  let index = 0;
  for (const item of state.items) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("btn-delete");
    button.textContent = "Delete";
    li.dataset.index = index;
    li.textContent = item;
    li.append(button);
    ul.append(li);
    index++;
  }
}

function addItem() {
  const value = input.value.trim();
  if (value == "") return;
  state.items.push(value);
  input.value = "";
  saveState();
  render();
}

function saveState() {
  const jsonString = JSON.stringify(state);
  localStorage.setItem("state", jsonString);
}

function loadState() {
  const receivedString = localStorage.getItem("state");
  state = JSON.parse(receivedString);
  render();
}

btnPlus.addEventListener("click", () => {
  state.count += 1;
  saveState();
  render();
});

btnMinus.addEventListener("click", () => {
  state.count -= 1;
  saveState();
  render();
});

btnReset.addEventListener("click", () => {
  state.count = 0;
  state.items = [];
  saveState();
  render();
});

btnAdd.addEventListener("click", () => {
  addItem();
});

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") addItem();
});

ul.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn-delete")) return;
  const index = event.target.closest("li").dataset.index;
  state.items.splice(index, 1);
  saveState();
  render();
});

document.addEventListener("DOMContentLoaded", () => {
  if (!JSON.parse(localStorage.getItem("state"))) return;
  loadState();
});
