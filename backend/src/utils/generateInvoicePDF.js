const PDFDocument = require("pdfkit");
const path = require("path");

// Load Unicode fonts (₹ safe)
const regularFont = path.join(__dirname, "../fonts/Roboto-Regular.ttf");
const boldFont = path.join(__dirname, "../fonts/Roboto-Bold.ttf");

const generateInvoicePDF = (invoice, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${invoice._id}.pdf`
  );

  doc.pipe(res);

  /* ---------------- HEADER ---------------- */
  doc
    .font(boldFont)
    .fontSize(22)
    .text("GRAND SUNRISE HOTEL", { align: "center" });

  doc
    .font(regularFont)
    .fontSize(10)
    .text("Luxury Stay & Fine Dining", { align: "center" });

  doc.moveDown(1);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  /* ---------------- INVOICE INFO ---------------- */
  doc.font(regularFont).fontSize(12);
  doc.text(`Invoice ID: ${invoice._id}`);
  doc.text(`Date: ${new Date(invoice.createdAt).toLocaleString()}`);
  doc.moveDown(0.5);

  doc.text(`Guest Name: ${invoice.guestName}`);
  doc.text(`Room Number: ${invoice.roomNumber}`);
  doc.text(`Meal Type: ${invoice.mealType.toUpperCase()}`);
  doc.moveDown(1);

  /* ---------------- TABLE HEADER ---------------- */
  const tableTop = doc.y;
  doc.font(boldFont).fontSize(12);

  doc.text("Item", 50, tableTop);
  doc.text("Price", 300, tableTop, { width: 90, align: "right" });
  doc.text("Qty", 400, tableTop, { width: 50, align: "right" });
  doc.text("Total", 470, tableTop, { width: 80, align: "right" });

  doc.moveDown(0.3);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  /* ---------------- TABLE ROWS ---------------- */
  doc.font(regularFont).fontSize(11);

  invoice.items.forEach((item) => {
    doc.text(item.name, 50);
    doc.text(`₹ ${item.price}`, 300, doc.y - 12, {
      width: 90,
      align: "right",
    });
    doc.text(item.qty.toString(), 400, doc.y - 12, {
      width: 50,
      align: "right",
    });
    doc.text(`₹ ${item.price * item.qty}`, 470, doc.y - 12, {
      width: 80,
      align: "right",
    });
    doc.moveDown(0.5);
  });

  doc.moveDown(0.5);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

 /* ---------------- TAX SUMMARY (ALIGNED) ---------------- */
const summaryTop = doc.y + 10;

// Left position for labels, right for values
const labelX = 330;
const valueX = 470;

doc.font(regularFont).fontSize(11);

doc.text("Subtotal", labelX, summaryTop);
doc.text(`₹${invoice.subtotal.toFixed(2)}`, valueX, summaryTop, {
  width: 80,
  align: "right",
});

doc.text("CGST (2.5%)", labelX, summaryTop + 18);
doc.text(`₹${invoice.cgst.toFixed(2)}`, valueX, summaryTop + 18, {
  width: 80,
  align: "right",
});

doc.text("SGST (2.5%)", labelX, summaryTop + 36);
doc.text(`₹${invoice.sgst.toFixed(2)}`, valueX, summaryTop + 36, {
  width: 80,
  align: "right",
});

/* Divider */
doc.moveTo(labelX, summaryTop + 58)
   .lineTo(550, summaryTop + 58)
   .stroke();

/* ---------------- GRAND TOTAL ---------------- */
doc.font(boldFont).fontSize(14);

doc.text("Grand Total", labelX, summaryTop + 70);
doc.text(`₹${invoice.total.toFixed(2)}`, valueX, summaryTop + 70, {
  width: 80,
  align: "right",
});

doc.moveDown(4);


  /* ---------------- FOOTER ---------------- */
  doc
    .font(regularFont)
    .fontSize(10)
    .text("Thank you for choosing Grand Sunrise Hotel!", {
      align: "center",
    });

  doc
    .fontSize(10)
    .text("We hope to serve you again soon.", {
      align: "center",
    });

  doc.end();
};

module.exports = generateInvoicePDF;
