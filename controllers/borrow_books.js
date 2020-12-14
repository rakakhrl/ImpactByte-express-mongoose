const BorrowBooks = require("../models/borrow_books");

class BorrowBooksController {
  static async getAllBorrowBooks(req, res, next) {
    try {
      const borrowBooksData = await BorrowBooks.find();

      res.status(200).json({
        message: "Get list of Borrow Books.",
        length: borrowBooksData.length,
        data: borrowBooksData,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBorrowBookById(req, res, next) {
    try {
      const id = req.params.id;
      const borrowBookData = await BorrowBooks.findById(id);

      if (borrowBookData) {
        res.status(200).json({
          message: `Get one borrow book with id ${id}.`,
          length: borrowBookData.length,
          data: borrowBookData,
        });
      } else {
        res.status(404).json({
          message: `Cannot find Borrow Book with id of ${id}`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async addNewBorrowBook(req, res, next) {
    try {
      const {
        borrower_name,
        books_id,
        borrowed_date,
        returned_date,
      } = req.body;

      const newBorrowBook = new BorrowBooks({
        borrower_name: borrower_name,
        books_id: books_id,
        borrowed_date: borrowed_date,
        returned_date: returned_date,
      });

      const result = await newBorrowBook.save();

      res.status(201).json({
        message: "Borrow book added.",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateBorrowBook(req, res, next) {
    try {
      const id = req.params.id;
      const update = req.body;
      const borrowBookData = await BorrowBooks.findOneAndUpdate(
        { _id: id },
        update,
        {
          new: true,
        }
      );

      res.status(200).json({
        message: `Borrow book with id ${id} updated successfully.`,
        data: borrowBookData,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBorrowBook(req, res, next) {
    try {
      const id = req.params.id;
      const borrowBookData = await BorrowBooks.findByIdAndDelete({ _id: id });

      res.status(200).json({
        message: `Borrow book with id ${id} deleted successfully.`,
        data: borrowBookData,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BorrowBooksController;
