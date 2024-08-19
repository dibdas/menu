const express = require("express");
const router = express.Router();
const SubCategory = require("../models/subCategory");
const Category = require("../models/category");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
// Create a sub-category
router.post("/api/subcategory", async (req, res) => {
  try {
    const subCategory = new SubCategory(req.body);
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(400).send("Category not found");
      }
    }
    await subCategory.save();
    res.status(201).send(subCategory);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all sub-categories
router.get("/api/subcategories", async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    res.send(subCategories);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get sub-categories by category

router.get("/api/subcategory/:idOrName", async (req, res) => {
  try {
    const query = req.params.idOrName;
    console.log("Query received:", query);

    let searchCriteria = {};

    // Check if the query is a valid ObjectId (24-character hexadecimal string)
    if (ObjectId.isValid(query) && /^[0-9a-fA-F]{24}$/.test(query)) {
      searchCriteria._id = query;
    } else {
      // Otherwise, assume the query is a name and create a case-insensitive regex
      searchCriteria.name = new RegExp("^" + query + "$", "i");
    }

    const subCategory = await SubCategory.findOne(searchCriteria);

    if (!subCategory) {
      return res.status(404).send({ error: "Sub-category not found" });
    }

    console.log("Sub-category found:", subCategory);
    res.send(subCategory);
  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Get sub-category by ID or name

router.get("/api/subcategory/:idOrName", async (req, res) => {
  try {
    const query = req.params.idOrName;
    console.log("Query received:", query);

    let searchCriteria = {};

    // Check if the query is a valid ObjectId (24-character hexadecimal string)
    if (ObjectId.isValid(query) && /^[0-9a-fA-F]{24}$/.test(query)) {
      searchCriteria._id = query;
    } else {
      // Otherwise, assume the query is a name and create a case-insensitive regex
      searchCriteria.name = new RegExp("^" + query + "$", "i");
    }

    const subCategory = await SubCategory.findOne(searchCriteria);

    if (!subCategory) {
      return res.status(404).send({ error: "Sub-category not found" });
    }

    console.log("Sub-category found:", subCategory);
    res.send(subCategory);
  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Edit a sub-category
router.put("/api/subcategoryi/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(subCategory);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
