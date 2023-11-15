const express = require('express');
const router = express.Router();
const { create, authUser, createUserFromWebhook } = require('../../controllers/user.controller');
router.post('/', create);
router.post('/auth', authUser);
router.post('/webhook/create', createUserFromWebhook);



module.exports = router;