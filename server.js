require("dotenv").config();
const express = require("express");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");

const helmet = require("helmet");  
const morgan = require("morgan"); 

const userRouter = require("./routes/user.route.js");
const supplierRouter = require("./routes/supplier.route.js");
const inverntoryRouter = require("./routes/routes.product.inventory.js");

connectDB = require("./config/db.js");

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.use(helmet());


app.use(morgan("dev"));


app.use("/api/users", userRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/inventory", inverntoryRouter);



app.get("/", (req, res) => {
  res.send("Freelancer Project And PAyment Management API");
});




app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
