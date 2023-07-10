const express = require('express');
const router = express.Router();
const general = require('../services/general')
const middleware = require('../middleware/middleware')
router.post("/login",general.login_user);
router.post("/register",general.register_user);
router.get("/Myprofile",middleware,general.profile_page);
router.post("/updatePassword",middleware,general.updatePassword)
module.exports = router;