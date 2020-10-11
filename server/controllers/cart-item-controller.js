const express = require("express");
const CartItem = require("../models/cart-item-model");
const cartItemLogic = require("../business-logic/cart-item-logic");
const router = express.Router();

router.get("/last-order", async (request, response) => {
  try {
    const items = await shoppingLogic.getLastOrder();
    response.json(items);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/update-cart-item", async (request, response) => {
  try {
    const item = new CartItem(request.body);
    item._id = request.body._id;
    const updatedItem = await cartItemLogic.updatedCartItem(item);
    if (!updatedItem) {
      response.sendStatus(404);
      return;
    }
    response.json(updatedItem);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/remove-cart-item/:id", async (request, response) => {
  try {
    const item = request.params.id;
    await cartItemLogic.removeCartItem(item);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/add-purchase", async (request, response) => {
  try {
    const newOrder = new Order(request.body);

    // Validate product:
    const error = await product.validate();
    if (error) {
      response.status(400).send(error.message);
      return;
    }

    const newPurchase = await orderLogic.addUserPurchase(newOrder);
    response.status(201).json(newPurchase);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// add new cart Item
router.post("/add-cart-item", async (request, response) => {
  try {
    const newCartItem = new CartItem(request.body);

    // Validate product:
    const error = await newCartItem.validate();
    if (error) {
      response.status(400).send(error.message);
      return;
    }

    const addedCartItem = await cartItemLogic.createNewCartItem(newCartItem);
    response.status(201).json(addedCartItem);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/last-cart-order/:id", async (request, response) => {
  try {
    const cartId = request.params.id;
    const items = await cartItemLogic.lastCartItems(cartId);
    response.json(items);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
