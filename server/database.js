// Import mysql package to connect to mysql server
const mysql = require("mysql");

// Import dotenv library and requre the .env configuration file
// It's called .config() and that's just the way it is
// This is used to protect your server without needing to input access details in source code.
const dotenv = require("dotenv").config();

// Define properties to be used for mysql connection in the .env file
// This method REQURES the the --> install --save dotenv <-- library
const properties = {
    host: `${process.env.DBHOST}`,
    port: process.env.DBPORT,
    user: `${process.env.DBUSER}`,
    password: `${process.env.DBPASS}`,
    database: `${process.env.DBNAME}`,
};

// Now we CREATE a connection to the MySQL database by calling the .createConnnection() method
// We assign a variable name to this connection so we can export the damn thing after
// We call the const properties defined above in the method
// Alternatively, we can also write:
// var connection = mysql.createConnection() {
//   host: 'mofo',
//   port: 'mofo',
//   user: 'mofo',
//   password: 'mofo',
//   database: 'mofo'   
// }
var connection = mysql.createConnection(properties)


// Now we have to actually CONNECT to the damn databse with the .connect() method on the connection we defined
// This sucker takes a callback function that has the err argument (it's just the way it is)
// We can pass this err to whatever by describing the function
connection.connect((error) => {
    if (error) {
        console.log(`Couldn't connect to the MySQL Server. Error: ${error}`)
    }
    else {
        console.log("Connected to MySQL successfully!")
    }
});

// Connecting to the MySQL Database Server from Node.js Tutorial
// https://www.mysqltutorial.org/mysql-nodejs/connect/


// Now we export the connection object so it can be used elsewhere
module.exports = {
    connection 
};
