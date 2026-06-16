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

// FIXED: Define an array of allowed origins (No trailing slashes allowed)
const allowedOrigins = [
  "http://localhost:5173",
  "https://salon-l31coth1q-rajkumarsah25022004-5733s-projects.vercel.app"
];

// FIXED CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

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