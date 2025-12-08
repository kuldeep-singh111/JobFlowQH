require('dotenv').config();
const express = require('express');
const { DbConection } = require("./Db");
const cors = require('cors');
const { startCronJob } = require('./services/cronJob');
const router = require('./routes/importLogRoute');
require('./queue/jobWorker');
const PORT = process.env.PORT || 9000;


require('./queue/jobWorker');
const app = express();

app.use(cors({
    origin: "https://job-flow-qh.vercel.app",
    methods: ['GET'],
    credentials: true
}));

app.use(express.json());


DbConection(process.env.MONGO_URL).then(() => {
    console.log("DataBase is connected...")
    startCronJob();
}).catch((err) => {
    console.log("Error in database Connecting....", err)
})

app.get("/api", (req, res) => {
    res.send("hello from server..")
})

app.use('/api/import-logs', router);


app.listen(PORT, () => {
    console.log(`server is started at ${PORT} PORT`)
})
