const express = require("express");
const appointmentRouter = require("./routes/appointment.js");
const app = express();
require("dotenv").config();
require("./config/db.js");

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", appointmentRouter);

app.listen(3000, () => console.log("Server started on port 3000"));
