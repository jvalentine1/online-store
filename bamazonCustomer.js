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
    listProducts();
  });

//list products function and call product response function
  function listProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for (var i = 0; i < 3; i++) {
           var products = res[i];

            var productList = [
                "Product ID: " + products.id,
                "Product: " + products.product_name,
                "Department: " + products.department_name,
                "Price: $" + products.price,
                "Stock Quantity: " + products.stock_quantity
            ].join("\n");

            console.log("\n");
            console.log(productList);
        }
    });
    promptCustomer()
  };

  //customer prompt function
  function promptCustomer() {
      console.log("\n");
    
    inquirer.prompt([
        {
            name: "productID",
            type: "number",
            message: "Enter the ID of the produuct you wish to purchase"
        },
        {
            name: "productQuantity",
            type: "number",
            message: "Enter the quantity you would like to purchase"
        }
    ]).then(function(answer) {
        findProduct(answer);
    });
  };
  

  //process order function
  function findProduct(answer) {
      connection.query("SELECT * FROM products WHERE id = " + "\'" + answer.productID + "\'", function(err, res) {
        
        if (err) throw err;
        
        if (answer.productQuantity > res[0].stock_quantity) {
            console.log("Insufficient Quanity");
            promptCustomer();
        }
        else {
            processOrder(answer, res);
        }
      });  
  };

  function processOrder(answer, res) {
      console.log(answer);
      console.log(res);
  }