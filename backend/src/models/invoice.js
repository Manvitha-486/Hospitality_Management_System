const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    roomNumber: Number,
    guestName: String,
    mealType: String,
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    subtotal: Number,
    cgst: Number,
    sgst: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
