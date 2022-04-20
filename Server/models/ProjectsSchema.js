const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var projectsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    creator: {
        type: String,
    },
});

//Export the model
const ProjectsModel = mongoose.model("projectsCollection", projectsSchema);
module.exports = ProjectsModel;
