const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example  app listening on port ${port}!`));
//
