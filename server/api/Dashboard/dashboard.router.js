const express = require('express');
const router = express.Router();
const {getData,getData_1,getData_2,getData_3,getData_4} = require('./dashboard.controller')

router.get("/getData_dummy", getData);
// router.post("/yearlyData",getData_2);
// router.post("/monthlyData",getData_3);
// router.post("/chooseDate",getData_4);
module.exports = router;