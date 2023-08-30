const {
  add,
  divide,
  isAdult,
  arrCopy,
  removeSpecialChars,
} = require("./index");

test("5 and 10 added together will give 15", () => {
  expect(add(5, 10)).toBe(15);
});

test("10 divided by 2 will give 5", () => {
  expect(divide(10, 2)).toBe(5);
});

test("Age 23 will give true", () => {
  expect(isAdult(23)).toBe(true);
});

test("Age 13 will give true", () => {
  expect(isAdult(13)).toBe(false);
});

test("Array copy check", () => {
  let arr = [5, 6, 7];
  expect(arrCopy(arr)).toEqual(arr);
});

test("Check rmeoveal of special chars", () => {
  expect(removeSpecialChars("aftab@$%akh^&an!d")).not.toMatch(/[$^&*()@£#!]/);
});
