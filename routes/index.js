const express = require('express');
const router = express.Router();
const wordToSentenceRoutes = require('./wordToSentenceRoutes');

router.use('/wordToSentence', wordToSentenceRoutes);

module.exports = router;
