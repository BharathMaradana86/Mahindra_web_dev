const express = require('express');
const router = express.Router();
const {zonewise, monthlywise, zoneselection,yearwise, timewise} = require('../services/analytics')

router.post("/zonewise",zonewise);
router.post("/zoneselection",zoneselection)
router.post("/timewise",timewise);
router.post("/monthlywise",monthlywise)
 router.post("/yearlywise",yearwise)

module.exports=router;