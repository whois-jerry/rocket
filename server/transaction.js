// This file will focus on CRUD operations against the transaction
// It has the ADD TRANSACTION function 
// It also has the SHOW ALL TRANSACTION

// This here makes it so we're able to call the connection object
// from the database file with database.connection.XXX
const database = require("./database");

// This shit here is some kinda web application framework for Node.js
// Express provides methods to specify what function is called for a particular HTTP verb (GET, POST, SET, etc.) and URL pattern ("Route"), 
// and methods to specify what template ("view") engine is used, where template files are located, and what template to use to render a response. 
const express = require("express");

// This express.Router() class allows us to create a mini-module that exists within this user.js file.
// We add all the routes in user.js file so the main.js file doesnt get clogged up.
router = express.Router();

// For easy typing
var magic = database.connection

// For more information on routing
// https://expressjs.com/en/guide/routing.html
// For more information why we use the new router.get() over the old app.get()
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4


// The syntax for the .get() method goes like
// router.post('/route', (req, res))

router.post('/transaction/add', (req, res) => {
    // The syntax for the .query() method goes like....
    // magic.query('SQL Syntax', (error, results))

    magic.query(
        `insert into transaction (stock, quantity, transaction_type, price, amount, fullname)
        values ('${req.query.stock}', '${req.query.quantity}', '${req.query.transaction_type}', 
        '${req.query.price}', '${req.query.amount}', '${req.query.fullname}')`, 
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send("Internal Server Error");
            } else {
                console.log(results);
                res.status(200).send("New Transaction Added Successfully!");
            }
        }
    );
});

router.get("/transaction/view", (req, res) => {
    magic.query(`select * from transaction where fullname = '${req.query.fullname}'`, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send(results);
        }
    });
});

router.get('/user/bal', (req, res) => {
    if (typeof(req.query.name) != 'string') {
        console.log(`Invalid user name received: ${req.query.name}`)
        response.status(400).send("Invalid user name received.");
        return;
    }

    // The syntax for the .query() method goes like....
    // magic.query('SQL Syntax', (error, results))

    magic.query(
        `select balance from user 
        where fullname = '${req.query.name}'`,
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).send(`Internal Server Error`)
            }
            else {
                console.log(results)
                res.status(200).send(results)
            }
        } 
    );
});

router.put('/user/newbal', (req, res) => {
    if (typeof(req.query.name) != 'string') {
        console.log(`Invalid user name received: ${req.query.name}`)
        response.status(400).send("Invalid user name received.");
        return;
    }
    else if (req.body.balance < 0) {
        console.log(`Cannot update an invalid balance: ${req.body.balance}`)
        response.status(400).send("Cannot update an invalid balance.");
        return;
    }

    // The syntax for the .query() method goes like....
    // magic.query('SQL Syntax', (error, results))

    magic.query(
        `update user
        set balance = ${req.body.balance}
        where fullname = '${req.query.name}'`, 
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).send(`Internal Server Error`)
            }
            else {
                console.log(results)
                res.status(200).send(`Account balance updated!`)
            }
        }
    )
});

module.exports = {
    router,
};

