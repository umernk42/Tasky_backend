require("dotenv").config();

const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

//express App
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/tasks", taskRoutes);


//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connecting to dB & Listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });