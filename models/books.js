const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: [3, "book title must have atleast 3 characters."],
      maxlength: [50, "book title can't have more than 50 characters."],
    },
    published_year: {
      type: Date,
      required: true,
    },
    racks_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Racks",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
