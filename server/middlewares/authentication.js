const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const checkAuth = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) throw new Error("Unauthenticated");

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) throw new Error("The user with the token no longer exist");

    const changedPass = freshUser.changePasswordAfter(decoded.iat);
    if (changedPass) throw new Error("User changed their password");

    req.user = freshUser;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      err: err.message,
    });
  }
};

module.exports = checkAuth;
