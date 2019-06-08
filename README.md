# bamazon-store

## About Bamazon

The Bamazon store is a CLI application that utilizes node.js and mysql to store product information, and allow the client to search for office products and make an order based off of bamazon's product list. 

## Why Bamazon

The Bamazon CLI app is an easy and productive application that allows users to ascertain all of the office supplies for their company with a few easy keystrokes. 

## How It Works!

#### Data Storage 

Bamazons product information is handled by MySql database to guarantee fast and secure data retrieval and storing.

![MySql](https://github.com/jvalentine1/online-store/blob/master/images/database-pic.png)

MySql provides effective table data storage

![MySql Table](https://github.com/jvalentine1/online-store/blob/master/images/table-pic.png)

#### Product View

When the application is run via node.js it will first render a list of existing products for the user

![Product render](https://github.com/jvalentine1/online-store/blob/master/images/product-render-gif.gif)

#### Placing An Order

The client will then be prompted to enter the id and quanity of the item they would like to purchase. Once they have entered these search fields bamazon will provide and order review. 

![Order Placing](https://github.com/jvalentine1/online-store/blob/master/images/product-order-gif.gif)

#### Total Cost

Bamazon will calculate the customers order and complete their transaction

![Order Review](https://github.com/jvalentine1/online-store/blob/master/images/order-review-pic.png)

#### Product Validation

If the user enters a product id that does not exist, bamazon will inform the customer that there is no such id and return them to the prompt field.

![Invalid id](https://github.com/jvalentine1/online-store/blob/master/images/bad-id-gif.gif)

If the user enters an invalid quantity, bamazon will inform the customer that the quantity is insufficient and return them to the prompt field.

![invalid quantity](https://github.com/jvalentine1/online-store/blob/master/images/bad-quantity-gif.gif)

#### Data Updates 

After an order has been placed by the customer than bamazon will update the MySql database to reflect the new quantity in stock. 

![data update](https://github.com/jvalentine1/online-store/blob/master/images/data-update-gif.gif)

#### Setting Up Your Machine

In order for developers to use this application they will have to install the following npm packages

        * npm install inquirer
        * npm install mysql

Devlopers will also be required to have a mysql account in to connect to the local instance server, then they will be able to utilize the sql schema and seed documents. 