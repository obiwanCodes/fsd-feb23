import mongoose from "mongoose";

const listingAndReviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "listingsAndReviews" }
);

export default listingAndReviewsSchema;
