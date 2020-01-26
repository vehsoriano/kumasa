const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  middle_name: {
    type: String
  },
  last_name: {
    type: String
  },
  phone_number: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  province: {
    type: String
  },
  role: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
