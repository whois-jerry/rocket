// This file will focus on CRUD operations against the user table
// It should have function ADD USER to database (Sign Up)
// It should also have function GET BALANCE by FULLNAME (Log-in)

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


// ADD USER
// The syntax for the .get() method goes like
// router.get('/route', (req, res))

router.post('/user/add', (req, res) => {

    // Request validation to ensure that a new user inputs a string as fullname.
    if (typeof(req.query.name) != 'string') {
        console.log(`Invalid user name received: ${req.query.name}`)
        response.status(400).send("Invalid user name received.");
        return;
    }

    // The syntax for the .query() method goes like....
    // magic.query('SQL Syntax', (error, results))

    magic.query(
        `insert into user (user_id, fullname, balance)
        values (${req.query.id}, '${req.query.name}', 0)`, 
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send("Internal Server Error");
            } else {
                console.log(results);
                res.status(200).send("New User Added Successfully!");
            }
        }
    );
});

// GET BALANCE (LOGIN) BY USER FULLNAME
// The syntax for the .get() method goes like
// router.get('/route', (req, res))

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

// UPDATE BALANCE BY USER FULLNAME
// The syntax for the .get() method goes like
// router.get('/route', (req, res))

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

// ADD SPECIFIC VALUE TO CURRENT BALANCE, BY USER FULLNAME

router.put('/user/addbal', (req, res) => {
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
        set balance =  balance + ${req.body.amount}
        where fullname = '${req.query.name}'`, 
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).send(`Internal Server Error`)
            }
            else {
                console.log(results)
                res.status(200).send(`Successfully Added to Account Balance!`)
            }
        }
    )
});

// SUBTRACT SPECIFIC VALUE TO CURRENT BALANCE, BY USER FULLNAME

router.put('/user/wthdrwbal', (req, res) => {
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
        set balance =  balance - ${req.body.amount}
        where fullname = '${req.query.name}'`, 
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).send(`Internal Server Error`)
            }
            else {
                console.log(results)
                res.status(200).send(`Successfully Withdrawn from Account Balance!`)
            }
        }
    )
});

module.exports = {
    router,
};

