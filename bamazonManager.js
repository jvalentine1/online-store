//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// local connection info
var connection = mysql.createConnection({
  host: "localhost",

  // local port
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Jessejames1!",
  database: "bamazon"
});

//establish local connection and product function call
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // listProducts();
  });