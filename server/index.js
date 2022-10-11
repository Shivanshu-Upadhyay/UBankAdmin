const express = require('express');
const app = express();
const port = 9241;
const config = require('./config/config.js');
const cors = require("cors");
const settelmentRoute = require('./route/settelmentRoute')
// Cors error
 
app.use(cors());
app.use(express.urlencoded())
app.use(express.json())

// routing
app.use(require('./route/route'));
app.use(settelmentRoute)

// run website
app.listen(port, (req, res) =>{
    console.log('http://' + config.DB_HOST + ':' + port);
});


