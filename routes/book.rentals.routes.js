const express = require('express');
const router = express.Router();

const userRentalController = require('../controllers/book.rental.controller');

router.get('/', userRentalController.findAll);
router.get('/:title', userRentalController.findOne);
router.post('/', userRentalController.create); 
router.patch('/:title', userRentalController.update);
router.delete('/:title/rentals/:id', userRentalController.delete);
router.get('/stats/stats1', userRentalController.stats1);

module.exports = router;