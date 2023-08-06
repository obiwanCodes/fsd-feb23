import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

import listingRoutes from "./routes/listings.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = 5007;

app.get("/test", (req, res) => res.send("Ok"));

app.use("/listings", listingRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
