const express = require('express');

const ctrl = require('../../controllers');

const router = express.Router();

const { validBody, authenticate } = require('../../middlewares/');
const { schemas } = require('../../models/userModel');

router.post('/register', validBody(schemas.registerSchema), ctrl.register);

router.post('/login', validBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/', authenticate, ctrl.updateSubscription);

module.exports = router;
