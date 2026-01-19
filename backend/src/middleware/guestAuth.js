const Guest = require("../models/guest");

const guestAuth = async (req, res, next) => {
  const { roomNumber, guestName } = req.body;

  const guest = await Guest.findOne({ roomNumber, guestName, checkIn: true });

  if (!guest) {
    return res.status(403).json({ message: "Guest not authorized" });
  }

  req.guest = guest;
  next();
};

module.exports = guestAuth;
