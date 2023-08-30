const functions = {
  add: (x, y) => x + y,
  divide: (x, y) => x / y,
  isAdult: (age) => (age >= 18 ? true : false),
  arrCopy: (arr) => [...arr],
  removeSpecialChars: (string) => string.replaceAll(/[$^&*()@£#]/g, ""),
};

module.exports = functions;
