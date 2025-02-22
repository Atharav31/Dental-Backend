const express = require("express");
const appointmentRouter = require("./routes/appointment.js");
const prescriptionRouter = require("./routes/prescription.js");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
require("./config/db.js");

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////////////////////////////////////////////////APIs///////////////////////////////////////////////
app.use("/api/v1", appointmentRouter);
app.use("/api/v1", prescriptionRouter);

app.listen(3000, () => console.log("Server started on port 3000"));
