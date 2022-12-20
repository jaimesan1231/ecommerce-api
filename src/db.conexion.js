const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Se conecto a la DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
