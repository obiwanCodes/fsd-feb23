import express from "express";
// import db from "./db.js";
const app = express();

const PORT = 5007;

app.get("/test", (req, res) => res.send("Ok"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
