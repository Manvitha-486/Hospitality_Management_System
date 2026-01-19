const express = require("express");
const Food = require("../models/food");

const router = express.Router();

// Admin: add food
router.post("/", async (req, res) => {
  const food = await Food.create(req.body);
  res.status(201).json(food);
});

// Get foods by meal type
router.get("/", async (req, res) => {
  const { mealType } = req.query;
  const foods = await Food.find({ mealType, available: true });
  res.json(foods);
});

module.exports = router;
