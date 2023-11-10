const express = require('express');
const router = express.Router();
const controller = require('../controllers/ModelController');
const { requireJwtAuth } = require('../middleware/');

router.get('/', controller);

module.exports = router;
