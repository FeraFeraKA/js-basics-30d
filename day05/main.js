let state = {
  count: 0,
  items: [],
  query: "",
};

const countSpan = document.querySelector(".count");
const listUl = document.querySelector(".list-ul");
const btnPlus = document.querySelector(".btn-plus");
const btnMinus = document.querySelector(".btn-minus");
const btnReset = document.querySelector(".btn-reset");
const btnAdd = document.querySelector(".btn-add");
const listInput = document.querySelector(".list-input");
const searchInput = document.querySelector(".search-input");
const total = document.querySelector(".total");
const visible = document.querySelector(".visible");

function render() {
  countSpan.textContent = state.count;
  const q = state.query.trim().toLowerCase();
  const filteredItems =
    q === ""
      ? state.items
      : state.items.filter((n) => n.text.toLowerCase().includes(q));
  listUl.innerHTML = "";

  total.textContent = state.items.length;
  visible.textContent = filteredItems.length;

  for (const item of filteredItems) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("btn-delete");
    button.textContent = "Delete";
    li.dataset.id = item.id;
    li.textContent = item.text;
    li.append(button);
    listUl.append(li);
  }
}

function addItem() {
  const value = listInput.value.trim();
  if (value === "") return;
  const obj = {};
  obj.id = crypto.randomUUID();
  obj.text = value;
  state.items.push(obj);
  listInput.value = "";
  saveState();
  render();
}

function saveState() {
  const jsonString = JSON.stringify(state);
  localStorage.setItem("state", jsonString);
}

function loadState() {
  const receivedString = localStorage.getItem("state");
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
  const id = event.target.closest("li").dataset.id;
  state.items = state.items.filter((obj) => obj.id !== id);
  saveState();
  render();
});

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("state")) return;
  loadState();
});
