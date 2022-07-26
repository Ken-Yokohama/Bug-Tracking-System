const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var bannedIpsSchema = new mongoose.Schema({
    ip: {
        type: String,
    },
});

//Export the model
const BannedIPsModel = mongoose.model('bannedIpsCollection', bannedIpsSchema);
module.exports = BannedIPsModel;
