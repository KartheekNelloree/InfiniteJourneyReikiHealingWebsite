const express = require('express')
const router = express.Router()
const { bookConsultation } = require('../controllers/bookingController')

router.post('/book-consultation', bookConsultation)

module.exports = router
