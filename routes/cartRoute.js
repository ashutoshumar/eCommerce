const express = require("express");

const {
 addCart,getCart,updateCart,deleteCart,deleteAllCart
} = require("../controllers/cartController.js");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/cart/new").post(isAuthenticatedUser, addCart);

router.route("/cart/item").get(isAuthenticatedUser, getCart);

router.route("/cart/update").put(isAuthenticatedUser, updateCart);

router.route("/cart/remove").put(isAuthenticatedUser, deleteCart);

router.route("/cart/delete").delete(isAuthenticatedUser,deleteAllCart);

module.exports = router;