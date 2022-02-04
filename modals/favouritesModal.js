const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  sloka: {
    type: mongoose.Schema.ObjectId,
    ref: "Sloka",
  },
  chapterName: {
    type: String,
  },
});

favouriteSchema.pre(/^find/, function (next) {
  this.populate({ path: "sloka" });
  next();
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;
