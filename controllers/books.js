const Books = require("../models/books");

class BooksController {
  static async getAllBooks(req, res, next) {
    try {
      const bookData = await Books.find();

      res.status(200).json({
        message: "Get list of books.",
        length: bookData.length,
        data: bookData,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const id = req.params.id;
      const bookData = await Books.findById(id);

      if (bookData) {
        res.status(200).json({
          message: "Get list of books.",
          length: bookData.length,
          data: bookData,
        });
      } else {
        res.status(404).json({
          message: `Cannot find book with id of ${id}`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async addNewBook(req, res, next) {
    try {
      const newBook = new Books(req.body);

      const result = await newBook.save();

      res.status(201).json({
        message: "Book created.",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      const update = req.body;
      const bookData = await Books.findOneAndUpdate({ _id: id }, update, {
        new: true,
      });

      res.status(200).json({
        message: `Book with id ${id} updated successfully.`,
        data: bookData,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      const bookData = await Books.findByIdAndDelete({ _id: id });

      res.status(200).json({
        message: `Book with id ${id} deleted successfully.`,
        data: bookData,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BooksController;
