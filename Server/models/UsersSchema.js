const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    role: {
        type: String,
    },
    projects: {
        type: Array,
    },
});

//Export the model
UsersModel = mongoose.model("usersCollection", userSchema);

module.exports = UsersModel;