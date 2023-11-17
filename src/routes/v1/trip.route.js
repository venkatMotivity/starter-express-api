const express = require('express');
const router = express.Router();
const { authenticate, checkJwt } = require('../../middleware/auth.middleware')
const { generate, getPopualarTripPlaces, getUserSearchHistory } = require('../../controllers/trip.controller');
router.post('/', authenticate, generate);
router.get('/', authenticate, getUserSearchHistory);

// router.get('/', getPopualarTripPlaces);

module.exports = router;