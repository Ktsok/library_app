const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/',verifyToken, bookController.findAll);
router.get('/test/', bookController.findAll);
router.get('/:title', verifyToken, bookController.findOne);
router.post('/', bookController.create);
router.patch('/', verifyToken, verifyRoles("ADMIN"), bookController.update);
router.delete('/', verifyToken, verifyRoles("ADMIN"), bookController.deleteByTitle);

module.exports = router; 