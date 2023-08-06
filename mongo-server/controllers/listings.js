import Listing from "../models/listings.js";

const getListings = async (req, res) => {
  return res.send(await Listing.find());
};

const createListing = async (req, res) => {
  const newListing = await Listing.create(req.body);
  return res.send({
    id: newListing._id,
    created: true,
  });
};

export { getListings, createListing };
