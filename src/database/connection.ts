import mongoose from "mongoose";

const ConnectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/sales-management")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDb", err));
};

export default ConnectDb;
