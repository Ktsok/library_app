const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/',verifyToken, bookController.findAll);
router.get('/test/', bookController.findAll);
router.get('/:id', verifyToken, bookController.findOne);
router.post('/', bookController.create);
router.put('/:id', verifyToken, verifyRoles("ADMIN"), bookController.update);
router.delete('/:id', verifyToken, verifyRoles("ADMIN"), bookController.deleteById);


module.exports = router; 