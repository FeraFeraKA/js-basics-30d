// #1

console.log("#1");

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

console.log(normalizeText("Привет   как дела   "));

// #2

console.log("#2");

function includesCI(text, query) {
  return text.toLowerCase().includes(query.toLowerCase());
}

console.log(includesCI("QwerTy", "qWE"));

// #3

console.log("#3");

function makeItem(text) {
  const id = crypto.randomUUID();
  return { id, text };
}

console.log(makeItem("Hello"));

// #4

console.log("#4");

function removeById(items, id) {
  return items.filter((n) => n.id !== id);
}

console.log(removeById([{ id: "Hello" }, { id: "Hi" }], "Hello"));

// #5

console.log("#5");

function getVisibleItems(items, query) {
  const q = (query ?? "").trim().toLowerCase();
  return items.filter((n) => n.text.toLowerCase().includes(q));
}

function getStats(items, query) {
  const total = items.length;
  const visible = getVisibleItems(items, query).length;
  return { total, visible };
}

console.log(
  getStats(
    [
      { id: 1, text: "trash" },
      { id: 5, text: "sweaty" },
    ],
    "TRASH"
  )
);
