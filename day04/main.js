let state = {
  count: 0,
  items: [],
  query: "",
};

const countSpan = document.querySelector(".count");
const searchP = document.querySelector(".search");
const listUl = document.querySelector(".list-ul");
const btnPlus = document.querySelector(".btn-plus");
const btnMinus = document.querySelector(".btn-minus");
const btnReset = document.querySelector(".btn-reset");
const btnAdd = document.querySelector(".btn-add");
const btnSearch = document.querySelector(".btn-search");
const listInput = document.querySelector(".list-input");
const searchInput = document.querySelector(".search-input");
const searchUl = document.querySelector(".search-ul");

const receivedString = localStorage.getItem("state");

function render() {
  countSpan.textContent = state.count;
  const q = state.query.trim();
  const filteredItems =
    q === ""
      ? state.items
      : state.items.filter((n) => n.toLowerCase().includes(q.toLowerCase()));
  listUl.innerHTML = "";
  searchUl.innerHTML = "";
  let index = 0;
  for (const item of state.items) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("btn-delete");
    button.textContent = "Delete";
    li.dataset.index = index;
    li.textContent = item;
    li.append(button);
    listUl.append(li);
    index++;
  }
  for (const item of filteredItems) {
    const li = document.createElement("li");
    li.textContent = item;
    searchUl.append(li);
  }
}

function addItem() {
  const value = listInput.value.trim();
  if (value === "") return;
  state.items.push(value);
  listInput.value = "";
  saveState();
  render();
}

function saveState() {
  const jsonString = JSON.stringify(state);
  localStorage.setItem("state", jsonString);
}

function loadState() {
  if (receivedString) state = JSON.parse(receivedString);
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

listInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  saveState();
  render();
});

listUl.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn-delete")) return;
  const index = Number(event.target.closest("li").dataset.index);
  state.items.splice(index, 1);
  saveState();
  render();
});

document.addEventListener("DOMContentLoaded", () => {
  if (!receivedString) return;
  loadState();
});
