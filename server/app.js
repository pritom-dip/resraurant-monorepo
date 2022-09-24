const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const categoryRouter = require("./routes/category.routes");

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1/category", categoryRouter);

const port = process.env.PORT || 3300;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
