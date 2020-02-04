const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Model
const User = require("../../models/User");
const RiderProfile = require("../../models/RidersProfile");

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  "/",
  [
    check("first_name", "Firstname is required")
      .not()
      .isEmpty(),
    check("last_name", "Lastname is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      first_name,
      middle_name,
      last_name,
      phone_number,
      age,
      email,
      address,
      city,
      province,
      role,
      password
    } = req.body;

    try {
      // check if the user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      user = new User({
        first_name,
        middle_name,
        last_name,
        phone_number,
        email,
        address,
        city,
        province,
        role,
        password
      });

      // encrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // if the role is rider save the profile
      if (role == "rider") {
        const ridersCount = await RiderProfile.find();
        const kumasaId = "KUMASA_RIDER" + (ridersCount.length + 1);
        rider = new RiderProfile({
          rider_user_id: user._id,
          rider_id: kumasaId,
          age,
          status: "offline"
        });
        await rider.save();
      }

      // return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 36000 },
        (err, token) => {
          if ((err, token)) {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// get all user
router.get("/", async (req, res) => {
  try {
    const user = await User.find();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get all riders
router.get("/riders", async (req, res) => {
  try {
    const data = [];
    const user = await User.find({ role: "rider" });
    for (let index = 0; index < user.length; index++) {
      const rider = await RiderProfile.findOne({
        rider_user_id: user[index]._id
      });
      data.push({
        // indexes for user
        id: user[index]._id,
        first_name: user[index].first_name,
        middle_name: user[index].middle_name,
        last_name: user[index].last_name,
        address: user[index].address,
        city: user[index].city,
        province: user[index].province,

        // indexes for rider profile
        rider_id: rider.rider_id,
        name: user[index].first_name + " " + user[index].last_name,
        email: user[index].email,
        phone_number: user[index].phone_number,
        age: rider.age,
        status: rider.status
      });
      console.log(data);
    }

    // console.log(user);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
