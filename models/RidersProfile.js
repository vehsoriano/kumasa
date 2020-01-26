const mongoose = require("mongoose");
const RidersProfileSchema = new mongoose.Schema({
  rider_user_id: {
    type: String
  },
  rider_id: {
    type: String
  },
  age: {
    type: String
  },
  status: {
    type: String
  },
  // experience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true
  //     },
  //     company: {
  //       type: String,
  //       required: true
  //     },
  //     location: {
  //       type: String
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false
  //     },
  //     description: {
  //       type: String
  //     }
  //   }
  // ],
  // education: [
  //   {
  //     school: {
  //       type: String,
  //       required: true
  //     },
  //     degree: {
  //       type: String,
  //       required: true
  //     },
  //     fieldofstudy: {
  //       type: String,
  //       required: true
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false
  //     },
  //     description: {
  //       type: String
  //     }
  //   }
  // ],
  // social: {
  //   youtube: {
  //     type: String
  //   },
  //   twitter: {
  //     type: String
  //   },
  //   facebook: {
  //     type: String
  //   },
  //   linkedin: {
  //     type: String
  //   },
  //   instagram: {
  //     type: String
  //   }
  // },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = RiderProfile = mongoose.model(
  "riders_profile",
  RidersProfileSchema
);
