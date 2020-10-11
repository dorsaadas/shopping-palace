const UserModel = require("../models/user-model");
const hash = require("../helpers/hash");

async function getAllUsers() {
  return UserModel.find().exec();
}

async function login(credentials) {
  // Hash user password:
  credentials.password = hash(credentials.password);
  return await UserModel.findOne(
    {
      username: credentials.username,
      password: credentials.password,
    },
    (err, user) => {
      if (err) {
        console.log("Error:", err);
        return;
      }
      if (!user) {
        return;
      }
      return user;
    }
  ).exec();
}

function register(user) {
  user.isAdmin = false;
  user.password = hash(user.password);
  return user.save();
}

module.exports = {
  login,
  register,
  getAllUsers,
};
