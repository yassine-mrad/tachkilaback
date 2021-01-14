const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Message = mongoose.model('Message');

const router = express.Router();

router.use(requireAuth);




module.exports = router;