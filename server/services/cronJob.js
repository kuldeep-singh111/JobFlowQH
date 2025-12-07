const cron = require('node-cron');
const axios = require('axios');
const xml2js = require('xml2js');
const ImportLog = require('../models/ImportLog');
const jobQueue = require('../queue/jobQueue');

const feeds = [
    'https://jobicy.com/?feed=job_feed',
    'https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time',
    'https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france',
    'https://jobicy.com/?feed=job_feed&job_categories=design-multimedia',
    'https://jobicy.com/?feed=job_feed&job_categories=data-science',
    'https://jobicy.com/?feed=job_feed&job_categories=copywriting',
    'https://jobicy.com/?feed=job_feed&job_categories=business',
    'https://jobicy.com/?feed=job_feed&job_categories=management',
    'https://www.higheredjobs.com/rss/articleFeed.cfm'
];

async function fetchJobs(feedUrl) {
    const res = await axios.get(feedUrl);
    const parsed = await xml2js.parseStringPromise(res.data, { explicitArray: false });
    const items = parsed.rss?.channel?.item;

    if (!items) return [];

    return Array.isArray(items) ? items.map(parseItem) : [parseItem(items)];
}

function parseItem(item) {
    const jobId = item.guid?._ || item.link;
    return {
        jobId,
        title: item.title || 'No Title',
        company: item['job:company'] || 'Unknown',
        location: item['job:location'] || 'Remote',
        postedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        description: item.description || ' '
    };
}

function startCronJob() {
    cron.schedule('0 * * * *', async () => {
        console.log(' Cron job started: Fetching feeds');

        for (const feed of feeds) {
            try {
                const jobs = await fetchJobs(feed);

                const log = await ImportLog.create({
                    url: feed,
                    timestamp: new Date(),
                    totalFetched: jobs.length,
                    newJobs: 0,
                    updatedJobs: 0,
                    failedJobs: []
                });

                for (const job of jobs) {
                    await jobQueue.add('import', { jobData: job, logId: log._id });
                }

                console.log(` Feed processed hogya: ${feed}`);
            } catch (err) {
                console.error(` Error processing feed: ${feed} - ${err.message}`);
            }
        }
    });
}

module.exports = { startCronJob };
