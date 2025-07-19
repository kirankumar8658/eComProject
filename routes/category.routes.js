const express = require("express");
const authMw = require("../middlewares/auth.mw");

category_controller = require("../controllers/category.controller");
const auth_mw = require("../middlewares/auth.mw");
const router = express.Router();

router.post(
  "/categories",
  [auth_mw.verifyToken, authMw.isAdmin],
  category_controller.createNewCategory
);

module.exports = router;
