const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("error:", error);
  }
};

conn();
