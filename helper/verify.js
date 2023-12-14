const errorHandler = require("./errorHandle.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("decoded", decoded);
    if (err) {
      return next(err);
    }

    req.user = decoded;
    next();
  });
};
module.exports = { verifyToken };
