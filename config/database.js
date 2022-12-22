const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect('mongodb+srv://st:st@cluster0.viim1ea.mongodb.net/purplle?retryWrites=true&w=majority');

module.exports = { connection };
