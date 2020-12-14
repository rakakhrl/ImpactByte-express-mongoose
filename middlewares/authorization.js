const authorization = (requiredRole) => (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== requiredRole) {
      throw new Error("Access forbiden for this role.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
