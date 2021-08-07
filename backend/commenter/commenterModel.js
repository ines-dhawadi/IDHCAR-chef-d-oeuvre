const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model (
  "testimonys",
  new Schema({
    userId: {
      type: mongoose.Types.ObjectId
    },
    comment: {
      type: String
    },
  })
);