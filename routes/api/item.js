const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Model
const Item = require("../../models/Item");

// @route  POST api/item
// @desc   Register item
// @access Public
router.post(
  "/",
  [
    check("item_branch_id", "Branch ID is required")
      .not()
      .isEmpty(),
    check("item_name", "Item is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { item_branch_id, item_name, price, status } = req.body;

    try {
      item = new Item({
        item_branch_id,
        item_name,
        price,
        status
      });

      await item.save();

      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const item = await Item.find();

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
