const mongoose = require("mongoose");

const importLogSchema = new mongoose.Schema({
    url: String,
    timestamp: {
        type:Date,
        default: Date.now
    },
    totalFetched: Number,
    newJobs: Number,

    updatedJobs: Number,
    failedJobs: [{
        jobId: String,
        reason: String
    }]

})

const ImportLog = mongoose.model("ImportLog", importLogSchema)

module.exports = ImportLog;
