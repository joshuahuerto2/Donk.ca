const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");

const {
  getItems,
  createItem,
  uploadImageForCreateItem,
  getItemByUserId,
  getItemById,
  updateItemById,
  deleteItemById,
} = require("../controllers/items");

router.get("/", getItems);
router.post("/", protect, createItem);
router.post("/image", protect, uploadImageForCreateItem);
router.get("/:id", getItemById);
router.get("/user/:id", getItemByUserId);
router.put("/:id", protect, updateItemById);
router.delete("/:id", protect, deleteItemById);

module.exports = router;
