const config = require("./config");
const util = require("util");

// Sql Connection
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  connectionLimit:10
});
connection.connect(function (err) {
  if (err) {
    console.log("error to connect database ❌❌");
  } else {
    console.log("connection success to database✅");
  }
});

const query = util.promisify(connection.query).bind(connection);



module.exports = query;

