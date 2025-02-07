const express = require("express");
require("./config/db.js");

const app = express();
app.listen(5000, () => console.log("Server started"));
