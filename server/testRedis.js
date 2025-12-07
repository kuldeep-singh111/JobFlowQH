const redis = require("./queue/connection");
require("dotenv").config();


// Test Redis connection
(async () => {
  try {
    console.log("hogya", await redis.ping());
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
