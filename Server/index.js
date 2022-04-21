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
const ProjectsModel = require("./models/ProjectsSchema");
const TicketsModel = require("./models/TicketsSchema");

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
                const token = jwt.sign(docs.toJSON(), process.env.JWTSECRET, {
                    expiresIn: "24hrs",
                });
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
        console.log(user);
        const token = jwt.sign(user.toJSON(), process.env.JWTSECRET, {
            expiresIn: "24h",
            // expiresIn: "120",
        });
        res.status(201).json({ token, email: sanitizedEmail });
        return;
    }
    res.status(400).send("Invalid Credentials, Check Username and Password");
});

// Middleware
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    const email = req.headers["email"];
    if (!token) {
        res.send("No Token Found!");
    } else {
        // When using a JWT Secret, just place it inside a process.env inside the server
        // Basically The authorization server verifies whether the JWT was issued by this authorization server
        jwt.verify(token, process.env.JWTSECRET, (err, decodedUser) => {
            if (err) {
                res.json({ auth: false, message: "U failed to authenticate" });
            } else {
                req.userId = decodedUser;
                next();
            }
        });
    }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
    console.log(req.userId);
    res.send("Yo, u are authenticated. Congrats!");
});

app.get("/pingServer", (req, res) => {
    res.send("Server Is Up!");
});

app.post("/createProject", verifyJWT, (req, res) => {
    var project = {
        title: req.body.title,
        description: req.body.description,
        author: req.userId.email,
    };
    ProjectsModel.create(project).then((docs) => {
        res.json("Succesfully Added a New Project");
    });
});

app.listen(3001, () => {
    console.log("App listening on port 3000!");
});
