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
    console.log("Logging In");
    res.send("Yo, u are authenticated. Congrats!");
});

app.get("/pingServer", (req, res) => {
    res.send("Server Is Up!");
});

app.post("/createProject", verifyJWT, (req, res) => {
    var project = {
        title: req.body.title,
        description: req.body.description,
        creator: req.userId.email,
    };
    ProjectsModel.create(project).then((docs) => {
        res.json("Succesfully Added a New Project");
    });
});

app.get("/getAllProjects", verifyJWT, (req, res) => {
    ProjectsModel.find({}, (err, docs) => {
        if (err) {
            console.log(`Error: ` + err);
        } else {
            if (docs.length === 0) {
                res.json("No Documents Found");
            } else {
                res.json(docs);
            }
        }
    });
});

app.post("/createTicket", verifyJWT, (req, res) => {
    var ticket = {
        title: req.body.title,
        description: req.body.description,
        project: req.body.project,
        ticketAuthor: req.userId.email,
        priority: req.body.priority,
        status: "new",
        type: req.body.type,
        estimatedTime: req.body.estimatedTime,
        assignedDevs: [],
        comments: [],
    };
    TicketsModel.create(ticket).then((docs) => {
        res.json("Succesfully Added a New Ticket");
    });
});

app.get("/getAllTickets", verifyJWT, (req, res) => {
    TicketsModel.find({}, (err, docs) => {
        if (err) {
            console.log(`Error: ` + err);
        } else {
            if (docs.length === 0) {
                res.json("No Documents Found");
            } else {
                console.log("Sending Tickets");
                res.json(docs);
            }
        }
    });
});

app.post("/updateStatus", verifyJWT, (req, res) => {
    console.log(req.body.status);
    TicketsModel.updateOne(
        {
            _id: req.body.id,
        },
        {
            status: req.body.status,
        },
        (err, doc) => {
            if (err) {
                console.log(`Error: ` + err);
            } else {
                res.json("Succesfully Updated Status");
                console.log("Succesfully Updated Status");
            }
        }
    );
});

app.post("/addDevs", verifyJWT, (req, res) => {
    console.log(req.body.newDev);
    TicketsModel.updateOne(
        {
            _id: req.body.id,
        },
        { $push: { assignedDevs: req.body.newDev } },
        (err, doc) => {
            if (err) {
                console.log(`Error: ` + err);
            } else {
                res.json("Succesfully Added Devs to Ticket");
                console.log("Succesfully Added Devs to Ticket");
            }
        }
    );
});

app.post("/addComment", verifyJWT, (req, res) => {
    console.log(req.body.comment);
    TicketsModel.updateOne(
        {
            _id: req.body.id,
        },
        {
            $push: {
                comments: {
                    author: req.userId.email,
                    comment: req.body.comment,
                },
            },
        },
        (err, doc) => {
            if (err) {
                console.log(`Error: ` + err);
            } else {
                res.json("Succesfully Added Devs to Ticket");
                console.log("Succesfully Added Devs to Ticket");
            }
        }
    );
});

// req.userId.role;

app.get("/getUsers", verifyJWT, (req, res) => {
    if (req.userId.role != "admin") {
        res.json("Not Admin");
        console.log("Not Admin");
        return;
    }
    console.log("Admin Verified");

    UsersModel.find({}, (err, docs) => {
        if (err) {
            console.log(`Error: ` + err);
        } else {
            if (docs.length === 0) {
                res.json("No Documents Found");
            } else {
                res.json(docs);
            }
        }
    });
});

app.listen(process.env.PORT || 3001, () => {
    console.log("App listening on port 3000!");
});
