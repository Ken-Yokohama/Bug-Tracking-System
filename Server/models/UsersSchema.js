const mongoose = require('mongoose'); // Erase if already required

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
    dateRegistered: {
        type: String,
    },
    ipAddress: {
        type: String,
    },
    // projects: [String],
});

//Export the model
UsersModel = mongoose.model('usersCollection', userSchema);

module.exports = UsersModel;
