const express = require("express");
const cors = require("cors");

const foodRoutes = require("./routes/foodRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const guestRoutes = require("./routes/guestRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/invoices", invoiceRoutes);

module.exports = app;
