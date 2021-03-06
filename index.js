// main express server file

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// routes
const imageRoutes = require('./routes/image');

const app = express();
const port = 8000;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/image', imageRoutes);

// env variables

const mongo_URI =
  'mongodb+srv://solimantwali:S01iman811@cluster0.o4p2y.mongodb.net/DevChallengeDB?retryWrites=true&w=majority';

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// connect to db
mongoose.connect(mongo_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
  });
});
