import express from "express";
import connectDB, { client } from "./db/db.js";
import bcrypt from "bcrypt";
import { userSignupSchema, userLoginSchema } from "./schemas/user.js";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5005;
app.use(express.json());

const dbName = "login-logout";
const db = client.db(dbName);
const users = db.collection("users");

connectDB().then(console.log).catch(console.error);

app.get("/", (req, res) => res.send("Ok"));

app.get("/users", async (req, res) => res.send(await users.find({}).toArray()));

app.post("/signup", async (req, res) => {
  const { error, value } = userSignupSchema.validate(req.body);
  const { email, name, password } = req.body;
  if (error) return res.status(400).send(error.message);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.insertOne({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post("/login", async (req, res) => {
  const { error, value } = userLoginSchema.validate(req.body);
  const { email, password } = req.body;
  if (error) return res.status(400).send(error.message);
  try {
    const reqUser = await users.findOne({ email: email });
    if (reqUser) {
      const compareResult = await bcrypt.compare(password, reqUser.password);
      if (!compareResult) return res.status(401).send("Incorrect password");
      const token = jwt.sign({ _id: reqUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
      });
      res.cookie("accessToken", {
        httpOnly: true,
        secure: true,
      });
      return res.send({ message: "login Successful", token });
    }
    return res.status(404).send(`Cannot find user with the email: ${email}`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
