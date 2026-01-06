console.log("Day 1: OK");
console.log(new Date());

let name = "Kolyan";
let age = 19;
let isStudent = true;
let city = "Moscow";

console.log(typeof name, typeof age, typeof isStudent, typeof city);

console.log(age >= 18 ? "yeah" : "nope");

let numbers = [3, 1, 7, 2];
let sum = 0;

for (let number of numbers) {
  sum += number;
}

console.log(sum, Math.max(...numbers));

let user = {
  name,
  age,
};

user.skills = ["C++", "C#", "JS", "Python", "Java", "Kotlin"];

let arr = [];

for (let value of Object.values(user)) {
  console.log(value);
  arr.push(String(value));
}

console.log(arr.join(","));
