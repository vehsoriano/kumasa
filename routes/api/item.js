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

    const { 
      item_branch_id, 
      item_name, 
      price, 
      status, 
      logo,
      initialQuantity,
      isAdded
     } = req.body;

    try {
      item = new Item({
        item_branch_id,
        item_name,
        initialQuantity,
        isAdded,
        price,
        status,
        logo,
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

router.put("/update/:item_id", async (req, res) => {
  const { name, price, status, logo, isDeleted } = req.body;
  try {
    const item = await Item.findById(req.params.item_id);
    item.item_name = name;
    item.price = price;
    item.status = status;
    item.logo = logo;
    item.isDeleted = isDeleted
    item.save();
    res.json({
      data: {
        status: "success",
        msg: "Item Updated!"
      },
      item
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/delete/:item_id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.item_id);
    item.isDeleted = true
    console.log(item)
    return res.json({
      data: {
        status: 'success',
        msg: "Item Archived"
      },
      item
    })
    // await Item.deleteOne({ _id: req.params.item_id }).then(response => {
    //   return res.json({
    //     data: {
    //       status: "success",
    //       msg: "Item Successfully Deleted"
    //     }
    //   });
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
