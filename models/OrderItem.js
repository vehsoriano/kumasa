const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  order_item_order_id: {
    type: String
  },
  order_item_id: {
    type: String
  },

  qty: {
    type: String
  },
  total: {
    type: String
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

module.exports = OrderItem = mongoose.model("order_item", OrderItemSchema);
