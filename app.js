const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
//  var cors = require('cors')
const dotenv = require("dotenv");

dotenv.config({path:"config/config.env"})

// const whitelist = ['http://localhost:3000', 'https://localhost:3443','https://creative-cajeta-34d982.netlify.app'];
// var corsOptionsDelegate = (req, callback) => {
//     console.log("1")
//     var corsOptions;
//     console.log("req",req.header('Origin'));
//     if(whitelist.indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true };
//     }
//     else {
//         corsOptions = { origin: false };
//     }
//     callback(null, corsOptions);
// };
// app.use(cors(corsOptionsDelegate))
// app.options("*",cors(corsOptionsDelegate))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const cart = require("./routes/cartRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", cart);

app.use(express.static('frontend/build'));

app.get('*', (req, res) => {
 
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;