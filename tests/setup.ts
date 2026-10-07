import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

console.log("MONGO_URI:", process.env.MONGO_URI);