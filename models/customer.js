const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter valid email address",
    },
  },
  idNumber: {
    type: Number,
    required: true,
  },
  balance: {
    type: String,
    required: true,
  },
  accountNo: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
  address: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "user",
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
