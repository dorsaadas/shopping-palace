const express = require("express");
const authLogic = require("../business-logic/auth-logic");
const Register = require("../models/register-model");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (request, response) => {
  try {
    const userNames = await authLogic.getAllUsers();
    const user = new Register(request.body);
    const regPassword = new RegExp("^.*[A-Z].*$");
    const regEmail = new RegExp("^[w.]+@[w.].[w.]{2}$");
    const regID = new RegExp("^d{9}$");

    for (const user of userNames) {
      if (+request.body.personalId === user.personalId) {
        response.status(400).send("Personal ID is Already Exist");
        return;
      } else if (request.body.username === user.username) {
        response.status(400).send("User Name is Already Exist");
        return;
      }
    }

    if (
      user.personalId.toString().length >= 10 ||
      user.personalId.toString().length <= 8
    ) {
      response.status(400).send("Illegal Personal ID");
      return;
    }
    if (regID.test(user.personalId.toString())) {
      response.status(400).send("Illegal Personal ID");
      return;
    }
    if (user.email.length <= 9) {
      response.status(400).send("You are using illegal Email");
      return;
    }
    if (regEmail.test(user.email)) {
      response.status(400).send("You are using illegal Email");
      return;
    }
    if (user.password.length >= 8) {
      if (!regPassword.test(user.password)) {
        response
          .status(400)
          .send("Password must have at least 1 Upper case Latter");
        return;
      }
    } else {
      response
        .status(400)
        .send("To short Password, Password must have at lest 8 Characters");
      return;
    }
    const addedUser = await authLogic.register(user);

    const token = jwt.sign({ addedUser }, config.jwt.secretKey, {
      expiresIn: "3h",
    });

    response.status(201).json({ addedUser, token });
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/login", async (request, response) => {
  try {
    const credentials = request.body;
    const user = await authLogic.login(credentials);
    if (!user) {
      response.status(401).send("Illegal username or password");
      return;
    }
    const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "3h" });
    response.json({ user, token });
  } catch (err) {
    response.status(500).send(err);
  }
});

router.post("/logout", (request, response) => {
  try {
    response.end();
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
