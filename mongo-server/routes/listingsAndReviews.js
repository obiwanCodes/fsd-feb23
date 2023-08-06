import express from "express";
import {
  getListingsAndReviwes,
  createListingsAndReviwes,
} from "../controllers/listingsAndReviews.js";

const router = express.Router();

router.get("/", getListingsAndReviwes);
router.post("/", createListingsAndReviwes);

export default router;
