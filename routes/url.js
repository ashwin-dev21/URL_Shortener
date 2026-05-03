const express = require('express');
const { handleGenerateNewShortUrl } = require('../controllers/url');
const router = express.Router();
const Url = require('../models/url');

router.post('/', handleGenerateNewShortUrl);

module.exports = router;