const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ItemModel = require("./models/Items");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://solimantwali:S01iman811@cluster0.o4p2y.mongodb.net/DevChallengeDB?retryWrites=true&w=majority"
);

// all API requests are in this file .. for now .. routes in other files coming later
app.get("/getItems", (req, res) => {
  ItemModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//needs to be async because we want to save info
app.post("/createItem", async (req, res) => {
  const item = req.body;
  const newItem = new ItemModel(item);
  await newItem.save();
  res.json(item);
});

app.listen(3001, () => {
  console.log("SERVER RUNNING");
});
