const express = require('express');
const { generated } = require('../services/reports');
const router = express.Router();

router.post("/generated",generated);

module.exports = router;

