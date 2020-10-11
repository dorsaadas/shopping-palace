const CartModel = require("../models/cart-model");

// add new shopping cart
function createNewShoppingCart(cartInfo) {
  return cartInfo.save();
}

// send all cart for the current user
function getAllUserCarts(userIdForAllCarts) {
  return CartModel.find({ userId: userIdForAllCarts }).exec();
}
function deleteLastCart(cartId) {
  return CartModel.deleteOne({ _id: cartId });
}

module.exports = {
  createNewShoppingCart,
  getAllUserCarts,
  deleteLastCart,
};
