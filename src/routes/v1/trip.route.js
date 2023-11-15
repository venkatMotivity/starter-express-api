const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/auth.middleware')
const { generate, getPopualarTripPlaces, getUserSearchHistory } = require('../../controllers/trip.controller');
router.post('/', generate);
router.get('/', authenticate, getUserSearchHistory);

// router.get('/', getPopualarTripPlaces);

module.exports = router;