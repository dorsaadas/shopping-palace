const express = require("express");
const Cart = require("../models/cart-model");
const cartLogic = require("../business-logic/cart-logic");
const router = express.Router();

router.post("/new-cart", async (request, response) => {
  try {
    const cart = new Cart(request.body);

    // Validate cart:
    const error = await cart.validate();
    if (error) {
      response.status(400).send(error.message);
      return;
    }

    const newCart = await cartLogic.createNewShoppingCart(cart);
    response.status(201).json(newCart);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/get-user-carts/:id", async (request, response) => {
  try {
    const _id = request.params.id;
    const userCarts = await cartLogic.getAllUserCarts(_id);
    response.json(userCarts);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/delete-cart/:id", async (request, response) => {
  try {
    const _id = request.params.id;
    await cartLogic.deleteLastCart(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
