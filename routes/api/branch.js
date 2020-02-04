const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Model
const Branch = require("../../models/Branch");

// @route  POST api/branch
// @desc   Register branch
// @access Public
router.post(
  "/",
  [
    check("name", "Firstname is required")
      .not()
      .isEmpty(),
    check("address", "Lastname is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, contact, address } = req.body;

    try {
      branch = new Branch({
        name,
        contact,
        address
      });

      await branch.save();

      res.json(branch);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
router.put("/update/:branch_id", async (req, res) => {
  const { name, contact, address } = req.body;
  try {
    const branch = await Branch.findById(req.params.branch_id);
    branch.name = name;
    branch.contact = contact;
    branch.address = address;
    branch.save();
    res.json({
      data: {
        status: "success",
        msg: "Branch Updated!"
      },
      branch
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// dlete branch
router.delete("/delete/:branch_id", async (req, res) => {
  try {
    await Branch.deleteOne({ _id: req.params.branch_id });
    await Item.deleteMany({ item_branch_id: req.params.branch_id });
    res.json({
      data: {
        status: "success",
        msg: "Branch Removed!"
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const branch = await Branch.find();

    res.json(branch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/affiliates", async (req, res) => {
  try {
    const data = [];
    const branch = await Branch.find();
    for (let index = 0; index < branch.length; index++) {
      const item = await Item.find({ item_branch_id: branch[index]._id });
      data.push({
        id: branch[index]._id,
        branch_name: branch[index].name,
        address: branch[index].address,
        contact: branch[index].contact,
        total_items: item.length
      });
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
