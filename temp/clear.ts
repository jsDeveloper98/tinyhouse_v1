import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "../src/database";

const clear = async () => {
  try {
    console.log("clear is running...");

    const db = await connectDatabase();

    const [bookings, listings, users] = await Promise.all([
      db.bookings.find().toArray(),
      db.listings.find().toArray(),
      db.users.find().toArray(),
    ]);

    if (bookings.length) {
      await db.bookings.drop();
    }

    if (listings.length) {
      await db.listings.drop();
    }

    if (users.length) {
      await db.users.drop();
    }

    await console.log("successfully cleared");
  } catch {
    throw new Error("failed to clear database");
  }
};

clear().then(() => {
  process.exit();
});
