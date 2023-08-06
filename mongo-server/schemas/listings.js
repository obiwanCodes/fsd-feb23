import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Please provide the price per night"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  description: {
    type: String,
    required: false,
  },
  currency: {
    type: String,
    enum: ["USD", "INR", "EUR", "GBP"],
    required: true,
  },
});

export default listingSchema;
