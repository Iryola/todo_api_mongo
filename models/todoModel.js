const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todos = new Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Todos", Todos);
