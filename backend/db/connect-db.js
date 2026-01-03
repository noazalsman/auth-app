import mongoose from "mongoose";

const connectDB = async () => {
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

export default connectDB;