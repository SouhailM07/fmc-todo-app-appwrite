import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.URI!);
    const { connection } = mongoose;
    connection.on("connected", () => {
      console.log("============================");
      console.log("DB is connected successfully");
      console.log("============================");
    });
    connection.on("error", (err) => {
      console.log("DB connection error , check this " + err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
}
