http = require("http")
express = require("express")
mysql = require("mysql")

app = express()
packages = []

// Create con variable for connection
con = mysql.createConnection({
    host: "localhost",
    user: "agent",
    password: "Rpu81opvi#3",
    database: "travelexperts",
  });

  // Connect to DB. Must pull data from within the function.
  con.connect(function(err) {
    if (err) throw err;

    // Get data from packages column
    con.query("SELECT * FROM packages", function (err, result, fields) {
      if (err) throw err;
      packages = result;



    });
  });
  

  