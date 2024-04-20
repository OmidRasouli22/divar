import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI || "");
    if (!connection) {
      throw new Error("Connection to Database Failed!");
    }
    console.log(
      `[Server]: MongoDB connected successfully: ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`Error Occured: ${error.message || ""}`);
    process.exit(1);
  }
}
