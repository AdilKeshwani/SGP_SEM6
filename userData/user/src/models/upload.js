const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const uploadSchema = new mongoose.Schema({
    id : String,
    filename : String,
});
const uploadModel = mongoose.model('uploadfiles', uploadSchema);
module.exports=uploadModel;
