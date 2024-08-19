const express = require("express");
const router = express.Router();
const Item = require("../models/items");
const SubCategory = require("../models/subCategory");
const Category = require("../models/category");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// Create an item
router.post("/api/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    if (req.body.subCategory) {
      const subCategory = await SubCategory.findById(req.body.subCategory);
      if (!subCategory) {
        return res.status(400).send("Sub-category not found");
      }
    } else if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(400).send("Category not found");
      }
    }
    item.totalAmount = item.baseAmount - item.discount;
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all items
router.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get items by category
router.get("/api/category/:categoryId", async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.categoryId });
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get items by sub-category
router.get("/api/subCategory/:subCategoryId", async (req, res) => {
  try {
    const items = await Item.find({ subCategory: req.params.subCategoryId });
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get item by ID or name
router.get("/api/item/search/:query", async (req, res) => {
  try {
    const query = req.params.query; // Get the query from the URL parameter
    console.log("Query received:", query);

    let searchCriteria = {};

    // Check if the query is a valid ObjectId
    if (ObjectId.isValid(query)) {
      searchCriteria._id = query;
    } else {
      // Otherwise, assume the query is a name
      searchCriteria.name = new RegExp("^" + query + "$", "i");
    }

    const item = await Item.findOne(searchCriteria);

    if (!item) {
      return res.status(404).send({ error: "Item not found" });
    }

    console.log("Item found:", item);
    res.send(item);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send(err);
  }
});

// Edit an item
router.put("/api/editi:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    item.totalAmount = item.baseAmount - item.discount;
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
