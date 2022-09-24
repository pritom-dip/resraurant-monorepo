const {
  registerService,
  getSingleUserByEmail,
  checkIfPasswordMatch,
} = require("../services/user.service");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.model");

const makeJwtToken = (data) => {
  const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const register = async (req, res) => {
  try {
    const result = await registerService(req.body);
    const token = makeJwtToken(result);
    return res.status(201).json({
      success: true,
      token: token,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Missing email or password",
      });
    }

    const user = await getSingleUserByEmail(email);

    if (!user || !(await checkIfPasswordMatch(user, password))) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const token = makeJwtToken(user);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
    });
  }
};

const protect = async (req, res, next) => {
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

module.exports = {
  register,
  login,
  protect,
};
