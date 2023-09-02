const axios = require("axios");

const functions = {
  add: (x, y) => x + y,
  divide: (x, y) => x / y,
  isAdult: (age) => (age >= 18 ? true : false),
  arrCopy: (arr) => [...arr],
  removeSpecialChars: (string) => string.replaceAll(/[$^&*()@£#!]/g, ""),
  percentageCalc: (marks, total) => {
    if (marks > total || marks < 0)
      throw new Error("marks cannnot be greater than total or less than 0");
    return (marks / total) * 100;
  },
  fetchGithubUser: async (username) => {
    if (username === undefined) throw new Error("username cannot be blank");
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    return response.data;
  },
  matchingStrings: (strings, queries) =>
    queries.map((query) => strings.filter((str) => str === query).length),
};

module.exports = functions;
