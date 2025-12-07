const { Queue } = require('bullmq');
const { connection } = require('./connection');


const jobQueue = new Queue('job-import', { connection });

module.exports = jobQueue;
