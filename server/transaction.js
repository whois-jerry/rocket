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
        `insert into transaction (transaction_id, user_id, stock, quantity, transaction_type)
        values ('${req.query.transaction_id}', '${req.query.user_id}',
        '${req.query.stock}', '${req.query.quantity}', '${req.query.transaction_type}')`, 
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

router.get("/transaction/all", (req, res) => {
    magic.query(`select * from transaction`, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send(results);
        }
    });
});

module.exports = {
    router,
};

