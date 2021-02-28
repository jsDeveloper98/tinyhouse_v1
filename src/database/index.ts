import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER } = process.env;
const URL = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};
