const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
 
},{timestamps:true})


module.exports = mongoose.model("url", UrlSchema);




