const express = require("express");
const Guest = require("../models/guest");

const router = express.Router();

// Create guest (check-in)
router.post("/", async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
