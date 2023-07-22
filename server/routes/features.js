const express = require('express');
const router = express.Router();
const {features} = require('../services/features')
router.post("/setfeatures",features);
module.exports = router;


