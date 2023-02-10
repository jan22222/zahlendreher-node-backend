var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for zahlendreher node backend.'})
})

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})