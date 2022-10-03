const {
  registerService,
  getSingleUserByEmail,
  checkIfPasswordMatch,
} = require("../services/user.service");
const makeJwtToken = require("../utils/makeJwtToken");
const sendMail = require("../utils/email");

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

module.exports = {
  register,
  login,
};
