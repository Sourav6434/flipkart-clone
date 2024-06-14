const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
//load config from env file
dotenv.config();
const app = express();
app.use(cors());

//middleware to parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

//import routes for product API
const productRouter = require("./routes/productroute");
const userRouter = require("./routes/userRoute");
const offerRouter = require("./routes/offersroute");
const cartRouter = require("./routes/cartRoute");
const wishlistRouter = require("./routes/wishlistRoute");
const orderRouter = require("./routes/orderRoute");
const addressRouter = require("./routes/addressRoute");

//mount the product API routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/offer", offerRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/order", orderRouter);
app.use("/api/address", addressRouter);

//start server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

//connect to the database
const connectDB = require("./config/database");
connectDB();

//default Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running on the webpage",
  });
});

module.exports = app;
