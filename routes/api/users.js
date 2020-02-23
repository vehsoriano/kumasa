const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Model
const User = require("../../models/User");
const RidersProfile = require("../../models/RidersProfile");

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
      return res.json({
        data: {
          status: "warning",
          msg: "Some Field are Required"
        }
      });
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
        return res.json({
          data: {
            status: "warning",
            msg: "User already exist"
          }
        });
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
        const ridersCount = await RidersProfile.find();
        const kumasaId = "KUMASA_RIDER" + (ridersCount.length + 1);
        rider = new RidersProfile({
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
            return res.json({
              data: {
                status: "success",
                msg: "User already exist"
              },
              user,
              token
            });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
// update user
router.put("/update/:user_id", async (req, res) => {
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
    // update user
    const user = await User.findById(req.params.user_id);
    user.first_name = first_name;
    user.middle_name = middle_name;
    user.last_name = last_name;
    user.phone_number = phone_number;
    user.email = email;
    user.address = address;
    user.city = city;
    user.province = province;
    user.role = role;
    if (password) {
      // encrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    user.save();
    // update riders profile
    const riders_profile = await RidersProfile.findOne({
      rider_user_id: req.params.user_id
    });
    riders_profile.age = age;
    riders_profile.save();

    res.json({
      data: {
        status: "success",
        msg: "Profile Updated"
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// dlete user
router.delete("/delete/:user_id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.user_id });
    await RidersProfile.deleteOne({ rider_user_id: req.params.user_id });
    res.json({
      data: {
        status: "success",
        msg: "User Removed!"
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

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

router.put("/rider_update_status/:rider_id", async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findById(req.params.rider_id);
    user.status = status;
    user.save();
    res.json({
      data: {
        status: "success",
        msg: "Success"
      }
    });
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
// get all riders
router.get("/riders/:rider_id", async (req, res) => {
  try {
    const rider = await RiderProfile.findOne({
      rider_user_id: req.params.rider_id
    });

    res.json(rider);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// // testing
// router.post("/test", async (req, res) => {
//   try {
//     const { test } = req.body;
//     for (let index = 0; index < test.length; index++) {
//       console.log(index);
//     }
//     console.log(test);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
