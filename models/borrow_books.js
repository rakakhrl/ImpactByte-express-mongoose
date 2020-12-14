const mongoose = require("mongoose");

const borrowBookSchema = new mongoose.Schema(
  {
    borrower_name: {
      type: String,
      required: true,
    },
    books_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
    is_returned: {
      type: Boolean,
      required: true,
      default: false,
    },
    borrowed_date: {
      type: Date,
      required: true,
    },
    returned_date: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          return this.borrowed_date <= value;
        },
        message: "returned_date must be after borrowed_date",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BorrowBooks = mongoose.model("BorrowBooks", borrowBookSchema);

module.exports = BorrowBooks;
