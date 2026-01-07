console.log("Day 1: OK");
console.log(new Date());

const name = "Kolyan";
const age = 19;
const isStudent = true;
const city = "Moscow";

console.log(typeof name, typeof age, typeof isStudent, typeof city);

console.log(age >= 18 ? "yeah" : "nope");

const numbers = [3, 1, 7, 2];
let sum = 0;
let max = 0;

for (let number of numbers) {
  sum += number;
  if (number > max) {
    max = number;
  }
}

console.log(sum, max);

let user = {
  name,
  age,
};

user.skills = ["C++", "C#", "JS", "Python", "Java", "Kotlin"];

let arr = [];

for (let value of Object.values(user)) {
  console.log(value);
  if (typeof value != "object") {
    arr.push(String(value));
  } else {
    arr.push("skills: " + value.join(", "));
  }
}

console.log(arr.join(", "));
