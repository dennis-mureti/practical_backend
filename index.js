// import 'package:express/express.dart'
const express = require("express");
const mongoose = require("mongoose");
// Import from other files
const authRouter = require("./routes/auth");
const customerRouter = require("./routes/customer");

// INIT
const PORT = process.env.PORT || 3000;
const app = express();
const DB =
  "mongodb+srv://Dennis:Dennis123@cluster0.vcfrrti.mongodb.net/?retryWrites=true&w=majority";

// middleware
app.use(express.json()); // To help handle distructuring
app.use(authRouter);
app.use(customerRouter);
// app.use(userRouter);

// connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

// app.listen(PORT, "10.0.2.2", () => {
//     console.log(`Connected to port ${PORT}`);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Connected to port ${PORT}`);
});
