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
  password: "root",
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

        for (var i = 0; i < res.length; i++) {
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
        connection.query("SELECT * FROM products WHERE id", function(err, res) {

            if (err) throw (err);
            var idCheck = false;

            for (var j = 0; j < res.length; j++) {
                if (res[j].id === answer.productID) {
                    findProduct(answer);
                    idCheck = true;
                }
            }
            if (!idCheck) {
                console.log("\n");
                console.log("No Such ID");
                promptCustomer();
            }   
        });
    });
  };
  

  //process order function
  function findProduct(answer) {
      connection.query("SELECT * FROM products WHERE id = " + "\'" + answer.productID + "\'", function(err, res) {
        
        if (err) throw err;
        
        if (answer.productQuantity > res[0].stock_quantity) {
            console.log("\n");
            console.log("Insufficient Quanity");
            promptCustomer();
        }
        else {
            processOrder(answer, res);
        }
      });  
  };

  function processOrder(answer, res) {

    var totalCost = answer.productQuantity * res[0].price;

    var orderReview = [
        "Your Order",
        "Item: " + res[0].product_name,
        "Product ID: " + res[0].id,
        "Order Quantity: " + answer.productQuantity,
        "Total Cost: $" +  totalCost
    ].join("\n");

    console.log("\n");
    console.log(orderReview);
    console.log("\nThank You For Your Order!");

      updateInventory(answer, res);
  }

  function updateInventory(answer, res) {
    var newStock = res[0].stock_quantity - answer.productQuantity;

    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStock
            },
            {
                id: res[0].id
            }
        ],
        function(err) {
            if (err) throw (err);
            console.log("\nInventory Updated");
            connection.end();
        });
  }