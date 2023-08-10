import express from "express";
import {
  getListings,
  createListing,
  getListingById,
  replaceListing,
  updateListing,
  deleteListing,
} from "../controllers/listings.js";

const router = express.Router();

router.get("/", getListings);
router.get("/:id", getListingById);
router.post("/", createListing);
router.put("/:id", replaceListing);
router.patch("/:id", updateListing);
router.delete("/:id", deleteListing);

export default router;
