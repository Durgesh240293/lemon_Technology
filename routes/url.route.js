const mongoose = require("mongoose");
const router = require("express").Router();
const validUrl = require ("valid-url"); 
const shortid = require ("shortid");

require ("../models/url.model.js");
const Url = mongoose.model("url");

const baseUrl = 'http:localhost:1111'


router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(baseUrl)) {
      return res.status(401).json({
        status : "FAILURE",
        message : "Invalid base URL",
      })
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
      try {
          
          let url = await Url.findOne({ longUrl:longUrl })

          if (url) {
              res.status(403).json({      //check once 
                data : url
              })
          } else {
            const shortUrl = baseUrl + '/' + urlCode
              url = await new Url( {  
                 urlCode: urlCode,
                longUrl: longUrl,
                shortUrl: shortUrl,
              }).save();
              res.status(200).json({
                status : "SUCCESS",
                message : "Shorten URL created successfully.",   // check once 
                data:url
            })
          }
      }
      catch (err) {
          res.status(500).json({
            status : "FAILURE",
            message : "Server Error"
          })
      }
  } else {
      res.status(401).json({
        status : "FAILURE",
        message : "Invalid longUrl",
      })
  }
})


router.get('/:code', async (req, res) => {
    try {
      const url = await Url.findOne({ urlCode: req.params.code })
      if (url) {
        return res.redirect(url.longUrl)
      } else {
        return res.status(404).json({
            status : "SUCCESS",
            message : "No URL Found"
        })
      }
    }
    catch (err) {
        res.status(500).json({
            status : "FAILURE",
            message : "Server Error"
          })
    }
  })
  module.exports = router;