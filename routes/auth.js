const express = require("express");
const User = require("../models/customer");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body; // get the data fom the client

    const existingUser = await User.findOne({ email }); // to find user
    // to check if existing user is there
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already esists!" });
    }

    // To hash our password
    const hashedPassword = await bcryptjs.hash(password, 8); //using salt which is a random string

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();
    res.json(user);
    // post data in the database
    // return the data to the user
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Sign In Route - we will use JWYT, bcrypt
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // now we find the user and check if exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }
    // to check if the password matches
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    // now we send the token
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// verify token
authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordkey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data
authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

// To enable use of functions from this file to other files
module.exports = authRouter;
