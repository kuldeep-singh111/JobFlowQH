const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    jobId: {
        type: String,
        unique: true,
        required: true,
    },
    title: {
        type: String
    },
    company: {
        type: String,
    },
    location: {
        type: String
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
})

const Job = mongoose.model("Job", jobSchema)

module.exports = Job;
