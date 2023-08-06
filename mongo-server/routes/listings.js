import express from "express";
import {
  getListings,
  createListing,
  getListingById,
} from "../controllers/listings.js";

const router = express.Router();

router.get("/", getListings);
router.get("/:id", getListingById);
router.post("/", createListing);

export default router;
