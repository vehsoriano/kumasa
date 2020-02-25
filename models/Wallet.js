const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  rider_id: {
    type: String
  },
  total_spend: {
    type: String
  },
  total_earned: {
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

module.exports = Wallet = mongoose.model("wallet", WalletSchema);
