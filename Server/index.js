const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(express.json());
app.use(cors());
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Models
const UsersModel = require("./models/UsersSchema");

mongoose.connect(process.env.MONGODBURI);

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const sanitizedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    UsersModel.findOne({
        email: sanitizedEmail,
    }).then((doc) => {
        if (!doc) {
            console.log("No User Found");
            // Create a User in MongoDb
            var user = {
                email: sanitizedEmail,
                password: hashedPassword,
                role: "developer",
            };
            UsersModel.create(user).then((docs) => {
                // Generate Web Token
                console.log(docs);
                const token = jwt.sign(docs.toJSON(), sanitizedEmail, {
                    expiresIn: "24hrs",
                });
                console.log(token);
                // Send Token + Email Object
                res.status(201).json({ token, email: sanitizedEmail });
            });
        } else {
            console.log("User Found");
            return res
                .status(409)
                .send("User Already Registered, Please Login");
        }
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const sanitizedEmail = email.toLowerCase();

    const user = await UsersModel.findOne({
        email: sanitizedEmail,
    });

    if (!user) {
        console.log("No User Found");
        res.status(400).send(
            "Invalid Credentials, Check Username and Password"
        );
        return;
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
        console.log("Wrong Password");
    }

    if (user && correctPassword) {
        const token = jwt.sign(user.toJSON(), sanitizedEmail, {
            expiresIn: "24h",
            // expiresIn: "120",
        });
        console.log(token);
        res.status(201).json({ token, email: sanitizedEmail });
        return;
    }
    res.status(400).send("Invalid Credentials, Check Username and Password");
});

app.listen(3001, () => {
    console.log("App listening on port 3000!");
});
