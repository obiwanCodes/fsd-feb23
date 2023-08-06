import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

import listingRoutes from "./routes/listings.js";
import listingAndReviewRoutes from "./routes/listingsAndReviews.js";

dotenv.config();
connectDB();

import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

export { client };

const app = express();
app.use(express.json());

const PORT = 5007;

app.get("/test", (req, res) => res.send("Ok"));

app.use("/listings", listingRoutes);
app.use("/listingsAndReviews", listingAndReviewRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
