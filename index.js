const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes.js");
const authSignUpRoute = require("./routes/authRoutes.js");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/test", userRoute); //test is before
// signup
app.use("/signup", authSignUpRoute);

app.listen(port, () => console.log(`Example  app listening on port ${port}!`));
//
// create a middleware for handleing error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "internal error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
