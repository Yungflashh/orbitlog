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