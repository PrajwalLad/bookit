import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connected!");
  } catch (error) {
    console.error("Error in connecting to db: ", error.message);
  }
};

export default connectDB;
