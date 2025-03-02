const express = require("express");
const cors = require("cors");
const appointmentRouter = require("./routes/appointment.js");
const prescriptionRouter = require("./routes/prescription.js");
const app = express();
const morgan = require("morgan");
const dashboardRouter = require("./routes/dashboard.js");
require("dotenv").config();
require("./config/db.js");

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(cors());

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", appointmentRouter);
app.use("/api/v1", prescriptionRouter);
app.use("/api/v1", dashboardRouter);

app.listen(8000, () => console.log("Server started on port 8000"));
