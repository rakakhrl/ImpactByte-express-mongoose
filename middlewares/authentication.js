const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const authentication = async (req, res, next) => {
  try {
    const { accesstoken } = req.headers;

    if (!accesstoken) {
      throw new Error("Access Token required.");
    }

    const payload = jwt.verify(accesstoken, process.env.SECRET_KEY);

    const user = await Users.findOne({ _id: payload.user_id });

    if (!user) {
      throw new Error("User not found.");
    }

    req.user = {
      user_id: payload.user_id,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
