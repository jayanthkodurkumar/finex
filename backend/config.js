// here we are defining the config details to connect to mongo db using mongoose ODM.
const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      
      connectTimeoutMS: 30000, 
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
