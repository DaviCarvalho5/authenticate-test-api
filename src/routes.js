const express = require('express');

const router = express.Router();

const UserController = require('./controllers/UserController');
const WebController = require('./controllers/WebController.js');
const AuthController = require('./controllers/AuthController.js');

const authMiddleware = require('./middlewares/auth.js')

router.get('/', WebController.renderHome);

// router.get('/login', WebController.renderLogin);
router.post('/login', AuthController.authenticate);

// router.get('/register', WebController.renderRegister);
router.post('/register', AuthController.register);

router.get('/users', authMiddleware, UserController.getOne);
router.post('/users', AuthController.register);
router.delete('/users/:id', UserController.removeOne);

module.exports = router;