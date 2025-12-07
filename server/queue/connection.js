const IORedis = require("ioredis");
require("dotenv").config();

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

connection.on("connect", () => console.log("Redis Connected "));
connection.on("error", (err) => console.log("Redis Error ", err));

module.exports = { connection };
