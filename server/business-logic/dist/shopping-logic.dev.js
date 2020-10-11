"use strict";

var ItemModel = require("../models/item-model");

var CategoryModel = require("../models/category-model");

function getAllItems() {
  return ItemModel.find().exec();
}

function getAllCategories() {
  return CategoryModel.find().exec();
}

module.exports = {
  getAllItems: getAllItems,
  getAllCategories: getAllCategories
};