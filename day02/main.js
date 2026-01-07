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
  render();
}

btnPlus.addEventListener("click", () => {
  state.count += 1;
  render();
});

btnMinus.addEventListener("click", () => {
  state.count -= 1;
  render();
});

btnReset.addEventListener("click", () => {
  state.count = 0;
  state.items = [];
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
  render();
});
