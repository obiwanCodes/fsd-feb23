import mongoose from "mongoose";
import listingAndReviewsSchema from "../schemas/listings&Reviews.js";

const ListingsAndReview = mongoose.model(
  "ListingsAndReview",
  listingAndReviewsSchema
);
export default ListingsAndReview;
