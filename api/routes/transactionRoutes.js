const express = require("express");
const controller = require("../controllers/transactions");
const userValidators = require("../validation/userValidation");

const router = express.Router();

router.post(
  "/transfer",
  userValidators.validateAccountNumb,
  userValidators.validateUser,
  controller.transfer
);

module.exports = router;
