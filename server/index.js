const express = require('express');
const app = express();
const port = 9241;
const config = require('./config/config.js');
const cors = require("cors");
const settelmentRoute = require('./route/settelmentRoute')
// Cors error
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
const corsOption = {
    credentials:true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  };
app.use(cors(corsOption));
app.use(express.urlencoded())
app.use(express.json())

// routing
app.use(require('./route/route'));
app.use(settelmentRoute)

// run website
app.listen(port, (req, res) =>{
    console.log('http://' + config.DB_HOST + ':' + port);
});


