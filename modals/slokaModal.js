const mongoose = require("mongoose");

const slokaSchema = new mongoose.Schema({
  chapter: {
    type: Number,
    ref: "Chapter",
  },
  chapterName: {
    type: String,
  },
  slokaNumber: {
    type: Number,
    required: [true, "A sloka must have number"],
  },
  speaker: String,
  sloka: {
    type: String,
    required: [true, "sloke missing"],
  },
  translation_hi: {
    type: String,
    required: [true, "sloke should be translated in hindi"],
  },
  translation_eng: {
    type: String,
    required: [true, "sloke should be translated in english"],
  },
  meaning: String,
  page: Number,
});

const Sloka = mongoose.model("Sloka", slokaSchema);

module.exports = Sloka;
