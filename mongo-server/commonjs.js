//const express = require("express");  //common js
//import express from "express" //ES module
// const addFunc = require("./functions").add;
// const diffFunc = require("./functions").diff;

const functions = require("./functions");
const { add, diff } = functions;

console.log(add(6, 7));
console.log(diff(8, 7));
