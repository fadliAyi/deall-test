const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.user = require("./user")(mongoose);

module.exports = db;