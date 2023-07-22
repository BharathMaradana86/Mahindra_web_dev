const express =require('express');
const { vmsfilters, getfilters } = require('../services/vms');
const router = express.Router();

router.post('/vmsfilters',vmsfilters);
router.post('/getfilters',getfilters)

module.exports = router;