const express = require('express');
const router = express.Router();

const rentalController = require('../controllers/rental.controller');

router.get('/', rentalController.findAll);
router.get('/test/', rentalController.findAll);
router.get('/:title', rentalController.findOne);
router.post('/', rentalController.create); 
router.patch('/:title', rentalController.update);
router.delete('/:title/rentals/:id', rentalController.delete);

module.exports = router;