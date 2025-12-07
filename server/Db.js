const mongoose = require("mongoose");


const DbConection = (url) => {
    return mongoose.connect(url)
};



module.exports = { DbConection };
