import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import env from "dotenv";
import pg from "pg";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";


const app = express();
const port = 3000;

env.config();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 10,
    }
}))

const db = new pg.Client({
    user: process.env.USER_DATABASE,
    host: process.env.HOST_DATABASE,
    database: process.env.DATABASE,
    password: process.env.PASSWORD_DATABASE,
    port: process.env.PORT_DATABASE,
});

db.connect();

function isAuthenticated(req){
    return req.session && req.session.user;
}

app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("registerPage.ejs");
});

app.get("/dashboard", (req, res) => {
    if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("dashboard.ejs", {user: req.session.user, cookieValue}); 
    }
    else{
        res.redirect("/");
    }
});

app.get("/usa", (req, res) => {
    if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("usa.ejs", {user: req.session.user, cookieValue}); 
    }
    else{
        res.redirect("/");
    }
});

app.get("/shopWith", (req, res) => {
    if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("shopWith.ejs", {user: req.session.user, cookieValue}); 
    }
    else{
        res.redirect("/");
    }
});

app.get("/uk", (req, res) => {
    if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("uk.ejs", {user: req.session.user, cookieValue}); 
    }
    else{
        res.redirect("/");
    }
});


app.get("/others", (req, res) => {
    if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("others.ejs", {user: req.session.user, cookieValue}); 
    }
    else{
        res.redirect("/");
    }

});

app.get("/company", (req, res) => {
    if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("company.ejs", {user: req.session.user, cookieValue}); 
    }
    else{
        res.redirect("/");
    }
});

app.get("/canada", (req, res) => {
    if(isAuthenticated(req)){
        const cookieValue = req.cookies["Current balance"];
        res.render("canada.ejs", {user: req.session.user, cookieValue}); 
    }
    else{
        res.redirect("/");
    }
});

app.get("/cart", (req, res) => {
    if(isAuthenticated(req)){
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
    }
    else{
        res.redirect("/");
    }
});

app.get("/logout", (req, res) => {
    res.redirect("/");
})

app.post("/register", async (req, res) => {
    try{
        const {
            username: username,
            email: email,
            password: password,
            checkPassword: checkPassword,
        } = req.body;

        console.log(req.body)
    
        // console.log(username)
        const response = await db.query("SELECT * FROM orbitlog WHERE email = $1",
            [email]
        );
        console.log(response.rows);
        
        if(response.rows.length > 0){
            res.render("registerPage.ejs", {error: `Email "${response.rows[0].email}" has been used`})
        }
        else if(password.length < 6){
            res.render("registerPage.ejs", {error: `Password length has to be greater than or equal to 6`})
        }
        else if(password != checkPassword){
            res.render("registerPage.ejs", {error: `Your password characters needs to match`})
        }
        else if(response.rows.length === 0 && (password === checkPassword)){
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            console.log(hashPassword);
            const newUser = await db.query("INSERT INTO orbitlog (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                [username, email, hashPassword]
            )
            console.log(newUser.rows[0]);
            res.redirect("/");
        }
    }
    catch(error){
        console.error(error);
    }
})

app.post("/dashboard", async(req, res) => {
    try{
        const {username, password} = req.body;
        const response = await db.query("SELECT * FROM orbitlog WHERE email = $1",
            [username]
        );
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

            bcrypt.compare(password, storedPassword, (error, valid) => {
                if(error){
                    res.render("login.ejs", {error: error})
                    console.log(error, "Hi");
                }
                else{
                    if(valid){
                        req.session.user = userData[0].username;
                        // console.log(req.session.user)
                        res.redirect("/dashboard")
                        console.log(valid);
                    }
                    else{
                        res.render("login.ejs", {error: "Incorrect password"});
                        console.log("Incorrect password");
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