const express = require('express');
const managerController = require('../controllers/managerController');

const router = express.Router();

router.post('/users', managerController.addUser);
router.put('/users/:id', managerController.editUser);
router.delete('/users/:id', managerController.removeUser);

module.exports = router;
