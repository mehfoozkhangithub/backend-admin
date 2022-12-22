
const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("express-async-errors");
const bodyParser = require("body-parser");

const { connection } = require("./config/database");
const { productRouter } = require("./Routes/Product.route");

const { userRouter } = require("./Routes/user.route");

const router = require("./Routes/Admin.route");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "welcome to trendy vibes testing Homepage API" });
});

app.use("/user", userRouter);
// app.use(Auth);



app.use("/product", productRouter);


app.use(bodyParser.json());
app.use("/admin", router);

app.use("/user", userRouter);
// app.use(Auth);



app.listen(8080, async () => {
  try {
    await connection;
    console.log("db is connected successfully");
  } catch (err) {
    console.log("db is connected successfully");
    console.log(err);
  }

  console.log(`Server is listning on 8080`);
});