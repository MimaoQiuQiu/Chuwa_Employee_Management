const jwt = require("jsonwebtoken");

// Make sure the user is logged in - Authentication
exports.loginVerify = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) return next();
    else
      return next({
        status: 401,
        message: "Please sign in first!",
      });
  } catch (err) {
    return next(err);
  }
};

// Check user's identity - Authorization
exports.userVerify = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded && decoded.id === req.params.id) return next();
    else
      return next({
        status: 401,
        message: "Unauthorized",
      });
  } catch (err) {
    return next(err);
  }
};

// Check user's role - Authorization
exports.hrVerify = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded && decoded.role === "HR") return next();
    else
      return next({
        status: 401,
        message: "Access Denied",
      });
  } catch (err) {
    return next(err);
  }
};
