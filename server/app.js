const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
const categoryRouter = require("./routes/category.routes");
const userRoutes = require("./routes/user.routes");

// Middlewares
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("db connected"));

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/user", userRoutes);

const port = process.env.PORT || 3300;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
