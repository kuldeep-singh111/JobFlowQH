const express = require('express');
const ImportLog = require('../models/ImportLog');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const logs = await ImportLog.find().sort({ timestamp: -1 });
        console.log("hello i hited", logs)

        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
