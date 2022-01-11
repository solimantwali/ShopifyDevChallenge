const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  itemcode: {
    type: String,
    required: true,
  },
});

const ItemModel = mongoose.model("items", ItemSchema);

module.exports = ItemModel;
