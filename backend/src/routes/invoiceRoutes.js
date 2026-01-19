const express = require("express");
const Invoice = require("../models/invoice");
const guestAuth = require("../middleware/guestAuth");
const generateInvoicePDF = require("../utils/generateInvoicePDF");

const router = express.Router();

// Create invoice + generate PDF
router.post("/pdf", guestAuth, async (req, res) => {
  try {
    const { items, mealType } = req.body;

    // 1️⃣ Calculate subtotal
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    // 2️⃣ Tax rates
    const CGST_RATE = 0.025;
    const SGST_RATE = 0.025;

    const cgst = subtotal * CGST_RATE;
    const sgst = subtotal * SGST_RATE;

    // 3️⃣ Grand total
    const total = subtotal + cgst + sgst;

    // 4️⃣ Save invoice
    const invoice = await Invoice.create({
      roomNumber: req.guest.roomNumber,
      guestName: req.guest.guestName,
      mealType,
      items,
      subtotal,
      cgst,
      sgst,
      total,
    });

    // 5️⃣ Generate PDF
    generateInvoicePDF(invoice, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
