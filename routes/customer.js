const express = require("express");
const customerRouter = express.Router();
const auth = require("../middlewares/auth");
const { customer } = require("../models/customer");

customerRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, balance, accountNo } = req.body;

  try {
    const newCustomer = new customerdetails({
      firstName,
      lastName,
      email,
      phone,
      balance,
      accountNo,
    });

    const customerdetails = await newCustomer.save();
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

customerRouter.get("/api/customerdetails", auth, async (req, res) => {
  try {
    console.log(req.query.category);
    const customerdetails = await Product.find({
      category: req.query.category,
    });
    res.json(customerdetails);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// create a get request to search customers and get them
customerRouter.get("/api/customers/search/:name", auth, async (req, res) => {
  try {
    const customerdetails = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    res.json(customerdetails);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = customerRouter;
