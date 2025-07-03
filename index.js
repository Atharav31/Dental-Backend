const express = require("express");
const cors = require("cors");
const appointmentRouter = require("./routes/appointment.js");
const prescriptionRouter = require("./routes/prescription.js");
const app = express();
const morgan = require("morgan");
const dashboardRouter = require("./routes/dashboard.js");
const { default: axios } = require("axios");
require("dotenv").config();
require("./config/db.js");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);



//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", appointmentRouter);
app.use("/api/v1", prescriptionRouter);
app.use("/api/v1", dashboardRouter);
app.post('/api/v1/ml/predict', async (req, res) => {
  try {
    // You can adjust this if you want to send more fields (e.g., symptoms, allergies)
    const inputData = req.body; // e.g., { diagnosis: "Cavity" }
    const response = await axios.post('http://localhost:5000/predict', inputData);
    res.json(response.data);
  } catch (error) {
    console.error("ML API Error:", error.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
