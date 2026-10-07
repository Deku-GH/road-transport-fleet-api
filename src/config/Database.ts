import mongoose from "mongoose";

class Database {
  private url: string;

  constructor() {
    const url = process.env.MONGO_URI;

    if (!url) {
      throw new Error("The MongoDB URL was not found");
    }

    this.url = url;
  }

  async connect(): Promise<void> {
    await mongoose.connect(this.url);
       console.log("MongoDB connected successfully");
  }
}

export default Database;
