import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// Replace the uri string with your connection string.
// const uri = process.env.MONGO_LOCAL_CONNECTTION_STRING;
const atlas_uri = process.env.MONGO_ATLAS_CONNECTTION_STRING;
// const client = new MongoClient(uri);
const client2 = new MongoClient(atlas_uri);

async function connectDB() {
  // Use connect method to connect to the server
  // await client.connect();
  console.log("Connected successfully to server");
  return "done.";
}

export default connectDB;

export { client2 };
