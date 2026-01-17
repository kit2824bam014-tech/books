const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/books");
const Orders = require("./routes/orders");

app.use("/api/v1", User);
app.use("/api/v1/books", Books);
app.use("/api/v1/orders", Orders);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
