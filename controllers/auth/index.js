const registerUser = require("./register");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const userSudsUpdate = require("./userSudsUpdate");
const userAvatarUpdate = require("./userAvatarUpdate");

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  userSudsUpdate,
  userAvatarUpdate,
};
