import mongoose from "mongoose";
import listingSchema from "../schemas/listings.js";

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
