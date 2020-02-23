const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order_user_id: {
    type: String
  },
  order_id: {
    type: String
  },
  rider_id: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  status: {
    type: String,
    default: "Pending"
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

module.exports = Order = mongoose.model("order", OrderSchema);
