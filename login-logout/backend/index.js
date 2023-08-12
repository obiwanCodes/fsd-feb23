import express from "express";
import connectDB, { client } from "./db/db.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = 5005;
app.use(express.json());

const dbName = "login-logout";
const db = client.db(dbName);
const collection = db.collection("users");

connectDB().then(console.log).catch(console.error);

app.get("/", (req, res) => res.send("Ok"));

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await collection.insertOne({
        name,
        email,
        password: hashedPassword,
      });
      return res.status(201).send(newUser);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  return res.status(400).send("Please provide 'name', 'email', 'password'");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
