const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// Create a category
router.post("/api/category", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all categories
router.get("/api/category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get category by ID or name

router.get("/api/category/:idOrName", async (req, res) => {
  try {
    const query = req.params.idOrName; // Get the query from the URL parameter
    console.log("Query received:", query);

    let searchCriteria = {};

    // Check if the query is a valid ObjectId
    if (ObjectId.isValid(query)) {
      searchCriteria._id = query;
    } else {
      // Otherwise, assume the query is a name
      searchCriteria.name = new RegExp("^" + query + "$", "i");
    }

    const category = await Category.findOne(searchCriteria);

    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    console.log("Category found:", category);
    res.send(category);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send(err);
  }
});

// Edit a category
router.put("/api/category/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(category);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
