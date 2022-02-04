const mongoose = require("mongoose");
const slugify = require("slugify");

const chapterSchema = new mongoose.Schema(
  {
    chapter: {
      type: Number,
      required: [true, "A chapter must have number"],
    },
    name_hi: {
      type: String,
      required: [true, "A chapter must have name in hindi"],
    },
    name_meaning_hi: {
      type: String,
      required: [true, "A name must have meaning in hindi"],
    },
    name_eng: {
      type: String,
      required: [true, "A chapter must have name in english"],
    },
    name_meaning_eng: {
      type: String,
      required: [true, "A name must have meaning in english"],
    },
    slug: String,
    sloka_length: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

chapterSchema.pre("save", function (next) {
  this.slug = slugify(this.name_eng, { lower: true });
  next();
});

chapterSchema.virtual("slokas", {
  ref: "Sloka",
  foreignField: "chapter",
  localField: "chapter",
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
