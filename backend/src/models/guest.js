const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  guestName: { type: String, required: true },
  checkIn: { type: Boolean, default: true },
  checkOutDate: { type: Date },
});

module.exports = mongoose.model("Guest", guestSchema);
