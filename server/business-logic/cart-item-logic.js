const CartItemModel = require("../models/cart-item-model");

// add new cart item
function createNewCartItem(cartItem) {
  return cartItem.save();
}
// add new cart item
function removeCartItem(cartItemId) {
  return CartItemModel.deleteOne({ _id: cartItemId });
}

// Get all items and categories
function getLastOrder(_idUser) {
  return ItemModel.find({ _id: _idUser }).exec();
}

// add and update items

async function updatedCartItem(product) {
  const info = await CartItemModel.updateOne(
    { productId: product.productId },
    product
  ).exec();
  return info.n ? product : null;
}

// add last Purchase
function addUserPurchase(purchase) {
  return purchase.save();
}

// Get last cart items
async function lastCartItems(cartIdVerification) {
  const cartItems = await CartItemModel.find({
    cartId: cartIdVerification,
  }).exec();
  return cartItems;
}

module.exports = {
  getLastOrder,
  addUserPurchase,
  updatedCartItem,
  createNewCartItem,
  removeCartItem,
  lastCartItems,
};
