import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const user = "boyakhchyan";
const userPassword = "mFIF0pWy9OzEssON";
const cluster = "cluster0.ueg2w";

const URL = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

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
