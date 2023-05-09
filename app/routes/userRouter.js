const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers, (req, res) => {
    res.render('users');
});

router.post('/users', userController.addUser);

module.exports = router;
