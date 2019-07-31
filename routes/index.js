const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) =>
res.send('Welcome to the browser'));

module.exports = router;
