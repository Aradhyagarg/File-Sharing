import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
  } catch (err) {
    console.error("Connection Error:", err);
    process.exit(1); // Exit process with failure
  }

  const connection = mongoose.connection;
    if (connection.readyState >= 1) {
      console.log("connected to database");
      return;
    }
    connection.on("error", () => console.log("connection failed"));
  };

export default connectDb;

