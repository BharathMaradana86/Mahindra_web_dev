const express = require('express');
const { selectcamera, getfiltereddata } = require('../services/livemonitor');
const router = express.Router();

router.get("/selectcamera/:id",selectcamera);
router.post("/getfiltereddata",getfiltereddata)


module.exports = router;