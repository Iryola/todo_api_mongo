require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const todoItemRoutes = require("./routes/todoRoutes");
const PORT = process.env.PORT || 4000;

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("You can chat with the db now");
  })
  .catch(err => {
    console.log("connection error: " + err);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/todos", todoItemRoutes);

app.listen(PORT, () => {
  console.log(`Up and running on port ${PORT}`);
});
