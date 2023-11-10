const express = require('express');
const requireJwtAuth = require('../middleware/requireJwtAuth');
const { getUserController, updateUserPluginsController } = require('../controllers/UserController');

const router = express.Router();

router.get('/', getUserController);
router.post('/plugins', updateUserPluginsController);

module.exports = router;
