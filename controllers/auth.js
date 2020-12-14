const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/users");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, password, role } = req.body;

      const newUser = new Users({
        username: username,
        password: bcrypt.hashSync(password, 8),
        role: role,
      });

      const result = await newUser.save();

      res.status(201).json({
        message: "User created successfully.",
        length: result.length,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await Users.findOne({ username: username });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error("username or password is invalid");
      }

      res.status(200).json({
        message: "Login successfull.",
        token: jwt.sign({ user_id: user._id }, process.env.SECRET_KEY),
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
