// imports
const express = require('express');
const router = express.Router();
const mainApiController = require('../controllers/main_api')

// api routes
router.post('/reports', mainApiController.saveReports);
router.get('/reports', mainApiController.getReports);

// exporting router
module.exports = router;