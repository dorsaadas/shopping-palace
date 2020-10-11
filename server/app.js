global.config = require("./config.json");
require("./data-access-layer/dal");
const express = require("express");
const server = express();
const cors = require("cors");
const authController = require("./controllers/auth-controller");
const productsController = require("./controllers/products-controller");
const cartController = require("./controllers/cart-controller");
const cartItemController = require("./controllers/cart-item-controller");
const purchaseController = require("./controllers/purchase-controller");
const expressRateLimit = require("express-rate-limit");

server.use(express.json());
server.use(cors());
// server.use(
//   "/api/",
//   expressRateLimit({
//     windowMs: 1000, // 1 sec
//     max: 10, // 10 request
//     message: "You send to much requests please wait between each other",
//   })
// );
server.use(
  express.static(`${__dirname}/../../client/src/assets/images/products/`)
);
server.use("/api/auth", authController);
server.use("/api/items/shop", productsController);
server.use("/api/items/cart", cartController);
server.use("/api/items/cart-item", cartItemController);
server.use("/api/items/purchase", purchaseController);

server.listen(3000, () => console.log("we are running on port 3000"));
