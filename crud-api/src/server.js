// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- MongoDB Connection ---
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/crud_exercise";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Mongoose Schema and Model ---
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be non-negative"],
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

// --- CRUD Endpoints ---

// GET /items → Return all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /items/:id → Return a specific item
app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: "Invalid item ID", error: err.message });
  }
});

// POST /items → Create a new item
app.post("/items", async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || price == null)
      return res.status(400).json({
        message: "All fields (name, description, price) are required",
      });

    const newItem = await Item.create({ name, description, price });
    res.status(201).json(newItem);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating item", error: err.message });
  }
});

// PUT /items/:id → Update an item
app.put("/items/:id", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating item", error: err.message });
  }
});

// DELETE /items/:id → Delete an item
app.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: "Invalid item ID", error: err.message });
  }
});

// --- Global Error Handling ---
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
