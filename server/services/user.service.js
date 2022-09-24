const User = require("../models/user.model");

const registerService = async (data) => {
  return await User.create({
    email: data?.email,
    password: data?.password,
    confirmPassword: data?.confirmPassword,
    firstName: data?.firstName,
    lastName: data?.lastName,
    mobile: data?.mobile,
    photo: data?.photo,
  });
};

const getSingleUserByEmail = async (email, password) => {
  return await User.findOne({ email }).select("+password");
};

const checkIfPasswordMatch = async (user, password) => {
  return await user.correctPassword(password, user.password);
};

module.exports = {
  registerService,
  getSingleUserByEmail,
  checkIfPasswordMatch,
};
