const functions = require("./index");

test("5 and 10 added together will give 15", () => {
  expect(functions.add(5, 10)).toBe(15);
});
