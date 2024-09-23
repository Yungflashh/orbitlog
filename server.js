import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import env from "dotenv";
import pg from "pg";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection } from "firebase/firestore";
// import { addDoc } from "firebase/firestore";
// import { getDocs } from "firebase/firestore";
// import axios from "axios";

const app = express();
const port = 3000;

env.config();

app.use(express.json());
// app.use(session({
//     secret: process.env.MY_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,
//         maxAge: 1000 * 10,
//     }
// }))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const db = new pg.Client({
//     user: process.env.USER_DATABASE,
//     host: process.env.HOST_DATABASE,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD_DATABASE,
//     port: process.env.PORT_DATABASE,
// })

const db = new pg.Client({
    user: process.env.USER_DATABASE,
    host: process.env.HOST_DATABASE,
    database: process.env.DATABASE,
    password: process.env.PASSWORD_DATABASE,
    port: process.env.PORT_DATABASE,
});


db.connect();
// console.log(db);
// const firebaseConfig = {
//     apiKey: "AIzaSyAGtcYUKpook7Fzb4Z-9aD1QTeWlI5qJ0A",
//     authDomain: "orbitlogs-12b2c.firebaseapp.com",
//     projectId: "orbitlogs-12b2c",
//     storageBucket: "orbitlogs-12b2c.appspot.com",
//     messagingSenderId: "680093097811",
//     appId: "1:680093097811:web:6f884d5dfba8f5a080cba6"
//   };

// const firebaseapp = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const usersCollectionRef = collection(db, 'users');

// function isAuthenticated(req){
//     return req.session && req.session.user;
// }

app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.get("/dashboard", (req, res) => {
    // if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("dashboard.ejs", {user: req.session.user, cookieValue}); 
    // }
    // else{
    //     res.redirect("/");
    // }
});

app.get("/usa", (req, res) => {
    // if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("usa.ejs", {user: req.session.user, cookieValue}); 
    // }
    // else{
    //     res.redirect("/");
    // }
});

app.get("/shopWith", (req, res) => {
    // if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("shopWith.ejs", {user: req.session.user, cookieValue}); 
    // }
    // else{
    //     res.redirect("/");
    // }
});

app.get("/uk", (req, res) => {
    // if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("uk.ejs", {user: req.session.user, cookieValue}); 
    // }
    // else{
    //     res.redirect("/");
    // }
});


app.get("/others", (req, res) => {
    // if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("others.ejs", {user: req.session.user, cookieValue}); 
    // }
    // else{
    //     res.redirect("/");
    // }

});

app.get("/company", (req, res) => {
    // if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("company.ejs", {user: req.session.user, cookieValue}); 
    // }
    // else{
    //     res.redirect("/");
    // }
});

app.get("/canada", (req, res) => {
    // if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("canada.ejs", {user: req.session.user, cookieValue}); 
    // }
    // else{
    //     res.redirect("/");
    // }
});

app.get("/cart", (req, res) => {
    // if(isAuthenticated(req)){
        const cart = req.cookies["CartArray"];
        if(cart){
            const array = JSON.parse(cart);
            const cookieValue = req.cookies["Current balance"];
            res.render("cart.ejs", {user: req.session.user, cart: array, cookieValue}); 
            // console.log(array);
        }
        else{
            res.render("cart.ejs", {user: req.session.user});     
        }
    // }
    // else{
    //     res.redirect("/");
    // }
});

app.post("/dashboard", async(req, res) => {
    try{
        const {username, password} = req.body;
        // const response = await db.query("SELECT * FROM defaultdb WHERE email = $1",
        //     [username]
        // );
        const response = await db.query("SELECT * FROM defaultdb");
        const userData = response.rows;
        // console.log(response.rows);

        if(userData.length === 0){
            res.render("login.ejs", {error: "User not found"})
        }
        else if(userData.length > 0){
            const {
                username: name,
                email: userEmail,
                password: storedPassword,
            } = userData[0];
            console.log(userData[0])

            bcrypt.compare(password, storedPassword, (error, valid) => {
                if(error){
                    res.render("login.ejs", {error: error})
                    console.log(error, "Hi");
                }
                else{
                    if(valid){
                        // req.session.user = name;
                        res.redirect("/dashboard")
                        console.log(valid);
                    }
                    else{
                        res.render("login.ejs", {error: "Incorrect password"})
                    }
                }
            });
        }
    }
    catch(error){
        res.render("login.ejs", {error: error});
        console.log(error);
    }
})


app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
})

// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const dotenv = require('dotenv');
// const { Pool } = require('pg');
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
// const connectPgSimple = require('connect-pg-simple')(session);
// const morgan = require('morgan');
// const helmet = require('helmet');
// const path = require('path');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Set view engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// // Middleware
// app.use(helmet());
// app.use(morgan('combined'));
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// // PostgreSQL session store setup
// const dbPool = new Pool({
//     user: process.env.USER_DATABASE,
//     host: process.env.HOST_DATABASE,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD_DATABASE,
//     port: process.env.PORT_DATABASE,
// });

// // Set up sessions
// app.use(session({
//     store: new connectPgSimple({
//         pool: dbPool, // Connection pool
//         tableName: 'session' // Use another table-name than the default "session" one
//     }),
//     secret: process.env.MY_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production', // Use true in production
//         maxAge: 1000 * 60 * 10, // 10 minutes
//     }
// }));

// // Connect to the database
// dbPool.connect(err => {
//     if (err) {
//         console.error("Database connection error:", err);
//         process.exit(1);
//     }
// });

// // Authentication check
// const isAuthenticated = (req) => {
//     return req.session && req.session.user;
// };

// // Routes
// app.get("/", (req, res) => {
//     res.render("login.ejs");
// });

// app.get("/dashboard", (req, res) => {
//     if (isAuthenticated(req)) {
//         const cookieValue = req.cookies["Current balance"];
//         res.render("dashboard.ejs", { user: req.session.user, cookieValue });
//     } else {
//         res.redirect("/");
//     }
// });

// app.get("/usa", (req, res) => {
//     if (isAuthenticated(req)) {
//         const cookieValue = req.cookies["Current balance"];
//         res.render("usa.ejs", { user: req.session.user, cookieValue });
//     } else {
//         res.redirect("/");
//     }
// });

// app.get("/shopWith", (req, res) => {
//     if (isAuthenticated(req)) {
//         const cookieValue = req.cookies["Current balance"];
//         res.render("shopWith.ejs", { user: req.session.user, cookieValue });
//     } else {
//         res.redirect("/");
//     }
// });

// app.get("/uk", (req, res) => {
//     if (isAuthenticated(req)) {
//         const cookieValue = req.cookies["Current balance"];
//         res.render("uk.ejs", { user: req.session.user, cookieValue });
//     } else {
//         res.redirect("/");
//     }
// });

// app.get("/others", (req, res) => {
//     if (isAuthenticated(req)) {
//         const cookieValue = req.cookies["Current balance"];
//         res.render("others.ejs", { user: req.session.user, cookieValue });
//     } else {
//         res.redirect("/");
//     }
// });

// app.get("/company", (req, res) => {
//     if (isAuthenticated(req)) {
//         const cookieValue = req.cookies["Current balance"];
//         res.render("company.ejs", { user: req.session.user, cookieValue });
//     } else {
//         res.redirect("/");
//     }
// });

// app.get("/canada", (req, res) => {
//     if (isAuthenticated(req)) {
//         const cookieValue = req.cookies["Current balance"];
//         res.render("canada.ejs", { user: req.session.user, cookieValue });
//     } else {
//         res.redirect("/");
//     }
// });

// app.get("/cart", (req, res) => {
//     if (isAuthenticated(req)) {
//         const cart = req.cookies["CartArray"];
//         if (cart) {
//             const array = JSON.parse(cart);
//             const cookieValue = req.cookies["Current balance"];
//             res.render("cart.ejs", { user: req.session.user, cart: array, cookieValue });
//         } else {
//             res.render("cart.ejs", { user: req.session.user });
//         }
//     } else {
//         res.redirect("/");
//     }
// });

// app.post("/dashboard", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const response = await dbPool.query("SELECT * FROM tvc_database WHERE email = $1", [username]);
//         const userData = response.rows;

//         if (userData.length === 0) {
//             res.render("login.ejs", { error: "User not found" });
//         } else if (userData.length > 0) {
//             const { username: name, password: storedPassword } = userData[0];

//             bcrypt.compare(password, storedPassword, (error, valid) => {
//                 if (error) {
//                     res.render("login.ejs", { error: error });
//                 } else {
//                     if (valid) {
//                         req.session.user = name;
//                         res.redirect("/dashboard");
//                     } else {
//                         res.render("login.ejs", { error: "Incorrect password" });
//                     }
//                 }
//             });
//         }
//     } catch (error) {
//         res.render("login.ejs", { error: error });
//     }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error("Internal Server Error:", err);
//     res.status(500).send("Something broke!");
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server started running on port ${port}`);
// });
