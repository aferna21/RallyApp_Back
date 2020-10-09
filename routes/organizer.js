const express = require('express')
const router = express.Router()
const passport = require('../utils/auth')


const { organizerDAO, circuitDAO, racingDAO } = require('../database')

router.post('/createRacing', passport.isBearerAuthenticated, function(req, res){
    res.send("caracoles!")
})

module.exports = router