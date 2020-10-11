const Purchase = require("../models/purchase-model");

// add new shopping cart
function newPurchase(purchaseInformation) {
  return purchaseInformation.save();
}

// send all cart for the current user
function getAllPurchases() {
  return Purchase.find().exec();
}

module.exports = {
  newPurchase,
  getAllPurchases,
};
