const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var ticketSchema = new mongoose.Schema(
    {
        project: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        ticketAuthor: {
            type: String,
        },
        priority: {
            type: String,
        },
        status: {
            type: String,
        },
        type: {
            type: String,
        },
        estimatedTime: {
            type: Number,
        },
        assignedDevs: {
            type: [String],
        },
        comments: {
            type: [
                {
                    author: String,
                    comment: String,
                },
            ],
        },
    },
    { timestamps: true }
);

//Export the model
const TicketsModel = mongoose.model("ticketsCollection", ticketSchema);
module.exports = TicketsModel;
