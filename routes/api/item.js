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
      return res.json({
        data: {
          status: "warning",
          msg: "Some field are required"
        }
      });
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
      return res.json({
        data: {
          status: "success",
          msg: "Awesome item added"
        },
        item
      });
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

router.get("/branch/:branch_id", async (req, res) => {
  try {
    const item = await Item.find({ item_branch_id: req.params.branch_id });

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/delete/:item_id", async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.item_id }).then(response => {
      return res.json({
        data: {
          status: "success",
          msg: "Item Successfully Deleted"
        },
        item
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
