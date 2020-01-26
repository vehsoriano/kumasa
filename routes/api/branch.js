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

router.get("/", async (req, res) => {
  try {
    const branch = await Branch.find();

    res.json(branch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
