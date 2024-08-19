const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConnect = require("./dbConnect");
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory");
const itemRoutes = require("./routes/items");
// const config = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/subcategories", subCategoryRoutes);
app.use("/items", itemRoutes);

// Start server
dbConnect.connecting();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
