DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

use bamazon;

create table products (
id integer(10) auto_increment not null,
product_name varchar(100) not null,
department_name varchar(100) not null,
price int(10) not null,
stock_quantity int (10) not null,
primary key(id)
);