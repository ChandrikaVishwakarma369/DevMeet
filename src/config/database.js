const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://chandrika:chandrika@cluster0ofdevmeet.9bxw2po.mongodb.net/?appName=Cluster0OfDevMeet",
  );
};
module.exports = connectDB;
