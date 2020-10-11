const ItemModel = require("../models/item-model");
const CategoryModel = require("../models/category-model");

// Get all items and categories
function getAllItems() {
  return ItemModel.find().exec();
}
function getAllCategories() {
  return CategoryModel.find().exec();
}

// add and update items

 function addProductAsync(product) {
  return  product.save();
}

// send all cart for the current user
async function updatedItem(editedProduct) {
  const info = await ItemModel.updateOne(
    { _id: editedProduct._id },
    editedProduct
  ).exec();
  return info.n ? editedProduct : null;
}

module.exports = {
  getAllItems,
  getAllCategories,
  addProductAsync,
  updatedItem,
};
