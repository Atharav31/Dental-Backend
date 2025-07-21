const express = require("express");
const {
  createBill,
  updateBill,
  billController,
} = require("../controller/billController");
const bill = express.Router();

bill.get("/", billController);
bill.post("/", createBill);
bill.put("/:billId", updateBill);

module.exports = bill;
