const jwt = require("jsonwebtoken");

const makeJwtToken = (data) => {
  const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = makeJwtToken;
