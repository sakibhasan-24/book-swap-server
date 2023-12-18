const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes.js");
const authSignUpRoute = require("./routes/authRoutes.js");
const booksCreateRoute = require("./routes/booksRoutes.js");
require("dotenv").config();

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);
// "https://book-swap-64d94.web.app/"
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
//     credentials: true,
//     exposedHeaders: ["Authorization"],
//   })
// );
app.use(express.json());
app.use(cookiParser());
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/", userRoute);
app.use("/books", booksCreateRoute);
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
