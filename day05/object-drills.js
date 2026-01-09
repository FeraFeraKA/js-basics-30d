// #1

console.log("\n#1\n");

const user = {
  name: "Kolyan",
  age: 19,
  isGraduated: false,
  skills: ["js", "c++"],
};

console.log(Object.keys(user), Object.values(user), Object.entries(user));

// #2

console.log("\n#2\n");

let counts = {
  grapewine: 3,
};

if (!counts.apple) counts.apple = 0;
counts.apple++;

console.log(counts);

// #3

console.log("\n#3\n");

function textById(arr, id) {
  for (const obj of arr) {
    if (obj.id === id) return obj.text;
  }
}

const arr = [
  { id: 1, text: "apple" },
  { id: 2, text: "grapewine" },
];

console.log(textById(arr, 2));

// #4

console.log("\n#4\n");

const settings = {
  theme: "dark",
  language: "en",
  notifications: true,
  volume: 73,
  autoSave: false,
  fontSize: 16,
  layout: "grid",
  lastLogin: "2026-01-09",
  experimental: true,
};

Object.entries(settings).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
