"use strict";

var UserModel = require("../models/user-model");

var hash = require("../helpers/hash");

function getAllUsers() {
  return regeneratorRuntime.async(function getAllUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", UserModel.find().exec());

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function login(credentials) {
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Hash user password:
          credentials.password = hash(credentials.password);
          _context2.next = 3;
          return regeneratorRuntime.awrap(UserModel.findOne({
            username: credentials.username,
            password: credentials.password
          }, function (err, user) {
            if (err) {
              console.log("Error:", err);
              return;
            }

            if (!user) {
              console.log("no USER");
              return;
            }

            return user;
          }).exec());

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function register(user) {
  user.isAdmin = false;
  user.password = hash(user.password);
  return user.save();
}

module.exports = {
  login: login,
  register: register,
  getAllUsers: getAllUsers
};