const express = require("express")
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://solimantwali:S01iman811@cluster0.o4p2y.mongodb.net/DevChallengeDBs?retryWrites=true&w=majority");

app.listen(3001, () => {
    console.log("SERVER RUNNING")
});