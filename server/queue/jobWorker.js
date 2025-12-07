const { Worker } = require('bullmq');
const { connection } = require('./connection');
const Job = require('../models/Job');
const ImportLog = require('../models/ImportLog');



new Worker('job-import', async (job) => {
    const { jobData, logId } = job.data;




    async function updateImportLog(type, data = null) {
            const updates = {};

            if (type === "new") {
                updates.$inc = { newJobs: 1 };
            }
            if (type === "updated") {
                updates.$inc = { updatedJobs: 1 };
            }
            if (type === "failed") {
                updates.$push = { failedJobs: data };
            }

            return ImportLog.findByIdAndUpdate(logId, updates);
        }


    try {
        const existing = await Job.findOne({ jobId: jobData.jobId });
        if (existing) {
            await Job.updateOne({ jobId: jobData.jobId }, jobData);
           await updateImportLog("updated");
        } else {
            await Job.create(jobData);
            await updateImportLog("new");
        }
    }catch (err) {
    
      await updateImportLog("failed", {
        jobId: jobData.jobId,
        reason: err.message,
      });
    }
}, { connection });
