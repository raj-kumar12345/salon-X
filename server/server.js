require("dotenv").config()
const cors = require("cors")
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route")
const appointmentRoutes = require("./routes/appointment.route")
const barberAuthRoutes = require("./routes/barber.auth.route")
const serviceRoute = require("./routes/service.route")
const cookieParser = require("cookie-parser")

const app = express();

// Connect Database
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://salon-x-rust.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Base Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/appointment", appointmentRoutes)
app.use("/api/service", serviceRoute)
app.use("/api/barber", barberAuthRoutes)

// Port Settings
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});