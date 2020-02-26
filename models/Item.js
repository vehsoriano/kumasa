const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  item_branch_id: {
    type: String
  },
  item_name: {
    type: String
  },
  price: {
    type: String
  },
  initialQuantity: {
    type: String
  },
  isAdded: {
    type: Boolean
  },
  isDeleted: {
    type: Boolean
  },
  status: {
    type: String
  },
  logo: {
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

module.exports = Item = mongoose.model("item", ItemSchema);
