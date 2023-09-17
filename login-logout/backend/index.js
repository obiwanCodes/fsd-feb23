import express from "express";
import connectDB, { client2 } from "./db/db.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { userSignupSchema, userLoginSchema } from "./schemas/user.js";
import jwt from "jsonwebtoken";
import { createClient } from "redis";
import authorize from "./middlewares/authorize.js";
import cors from "cors";

const app = express();
const PORT = 5005;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

connectDB().then(console.log).catch(console.error);

const dbName = "login-logout";
const db = client2.db(dbName);
const users = db.collection("users");

// const analyticsDBName = "sample_analytics";
// const analyticsDB = client2.db(analyticsDBName);
// const customers = analyticsDB.collection("customers");

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-11197.c55.eu-central-1-1.ec2.cloud.redislabs.com",
    port: 11197,
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

app.get("/", (req, res) => res.send("Ok"));

app.post("/admin", async (req, res) => {
  let token;
  if (req.headers?.authorization)
    token = req.headers?.authorization.split(" ")[1];
  if (token === process.env.MASTER_TOKEN) {
    if (req.body.email) {
      const modifiedUser = await users.updateOne(
        { email: req.body.email },
        { $set: { role: "admin" } }
      );
      return res.send(modifiedUser);
    }
    return res.sendStatus(400);
  }
  return res.sendStatus(403);
});

// app.get("/customers", async (req, res) =>
//   res.send(
//     await customers
//       .aggregate([
//         {
//           $lookup: {
//             from: "accounts",
//             localField: "accounts",
//             foreignField: "account_id",
//             as: "accounts",
//           },
//         },
//       ])
//       .toArray()
//   )
// );

// app.get("/accounts", async (req, res) =>
//   res.send(
//     await analyticsDB
//       .collection("accounts")
//       .aggregate([
//         {
//           $lookup: {
//             from: "transactions",
//             localField: "account_id",
//             foreignField: "account_id",
//             as: "transactions",
//           },
//         },
//       ])
//       .toArray()
//   )
// );

app.get("/users", authorize, async (req, res) =>
  res.send(await users.find({}).toArray())
);

app.delete("/users", authorize, async (req, res) => {
  if (req.body?.email) {
    if (req.user.role === "admin") {
      await users.deleteOne({ email: req.body.email });
      return res.sendStatus(204);
    }
    return res.sendStatus(403);
  }
  return res.sendStatus(400);
});

app.post("/signup", async (req, res) => {
  const { error, value } = userSignupSchema.validate(req.body);
  const { email, name, password } = req.body;
  if (error) return res.status(400).send(error.message);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const reqUser = await users.findOne({ email });
    if (reqUser) {
      return res
        .status(400)
        .send("User with that email already exists. Please login!");
    }
    const newUser = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "viewer",
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
      if (!compareResult)
        return res
          .status(404)
          .send(`Invalid credentials. Please check email/password`);
      const accessToken = jwt.sign(
        {
          email: reqUser.email,
          role: reqUser.role,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: "15m",
        }
      );
      const refreshToken = jwt.sign(
        { email: reqUser.email },
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        {
          expiresIn: "60m",
        }
      );
      let refreshTokens = await redisClient.get("refreshTokens");
      if (!refreshTokens) {
        await redisClient.set("refreshTokens", JSON.stringify([refreshToken]));
      } else {
        await redisClient.set(
          "refreshTokens",
          JSON.stringify([...JSON.parse(refreshTokens), refreshToken])
        );
      }
      res.cookie("accessToken", {
        httpOnly: true,
        secure: true,
      });
      return res.send({ email, accessToken, refreshToken });
    }
    return res
      .status(404)
      .send(`Invalid credentials. Please check email/password`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/token", async (req, res) => {
  const token = req.cookies["xpress-r-token"];
  if (!token) return res.sendStatus(401);
  let refreshTokens = JSON.parse(await redisClient.get("refreshTokens"));
  if (!refreshTokens.includes(token)) return res.sendStatus(403);
  try {
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY
    );
    const reqUser = await users.findOne({
      email: decodedPayload.email,
    });
    const accessToken = jwt.sign(
      {
        email: reqUser.email,
        role: reqUser.role,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    return res.send({ accessToken });
  } catch (error) {
    return res.sendStatus(403);
  }
});

app.post("/logout", async (req, res) => {
  let refreshTokens = JSON.parse(await redisClient.get("refreshTokens"));
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  await redisClient.set("refreshTokens", JSON.stringify(refreshTokens));
  return res.send("Logged out successfully");
});

// app.get("/products", authorize, async(req, res) => {
//   res.send([{
//     name:
//   }])
// })

const profiles = db.collection("profiles");

// app.post("/profiles", async (req, res) => {
//   await profiles.insertMany([
//     {
//       user_id: "64d75fcfc2318651f9adfb80",
//       name: "manjunath",
//       email: "manjunath@kh.com",
//       profileURL: "https://github.com/Manjunath-Hub10",
//     },
//     {
//       user_id: "64d76ddc281d4c8858b05bd8",
//       name: "aftab",
//       email: "aftab@kh.com",
//       profileURL: "https://github.com/aftabdotorg",
//     },
//     {
//       user_id: "64d773a605f404c27d06047c",
//       name: "saurabh",
//       email: "saurabh@kh.com",
//       profileURL: "https://github.com/saurabhon28",
//     },
//     {
//       user_id: "64d773f505f404c27d06047d",
//       name: "priti",
//       email: "priti@kh.com",
//       profileURL:
//         "https://keepup.com.au/wp-content/uploads/2022/12/16fslk6zdjar11mvqqunr8ddl6.jpg",
//     },
//     {
//       user_id: "64d77477a6dea9c51abb015a",
//       name: "deepika",
//       email: "deepika@kh.com",
//       profileURL: "https://github.com/DeepikaFSD",
//     },
//     {
//       user_id: "64d8b1f311058acaf1cbf664",
//       name: "raghav",
//       email: "raghav@kh.com",
//       profileURL: "https://github.com/Raghav-0311",
//     },
//   ]);
//   return res.sendStatus(201);
// });

app.get("/profiles", authorize, async (req, res) => {
  return res.send(await profiles.findOne({ user_id: req.userId }));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
