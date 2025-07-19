const express = require("express");
const authController = require("../controllers/auth.controller");

const authMW = require("../middlewares/auth.mw");
const authMw = require("../middlewares/auth.mw");

const router = express.Router();

router.post("/signup", [authMW.verifySignUpBody], authController.signup);
router.post("/signin", [authMw.verifySignInBody], authController.signin);
module.exports = router;
