const dotenv = require("dotenv");

dotenv.config();

const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const productRoutes = require("./routes/productRoutes");

const orderRoutes = require("./routes/orderRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

connectDB();

const app = express();

/* CORS FIRST */

app.use(cors({
   origin: "*",
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"]
}));

/* BODY PARSER */

app.use(express.json());

app.use(express.urlencoded({
   extended: true
}));

/* OTHER MIDDLEWARE */

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

/* ROUTES */

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/payment", paymentRoutes);

/* TEST */

app.get("/", (req, res) => {

   res.send("API Running...");

});

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

   console.log(`Server running on port ${PORT}`);

});