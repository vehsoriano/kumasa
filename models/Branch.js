const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  name: {
    type: String
  },
  contact: {
    type: String
  },
  address: {
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

module.exports = Branch = mongoose.model("branch", BranchSchema);
