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
    console.log("🔌 Connecting to MongoDB...");
    console.log("📍 URL:", this.url);

    await mongoose.connect(this.url);
  }
}

export default Database;
