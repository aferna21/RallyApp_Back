const express = require('express')
const router = express.Router()
const passport = require('../utils/auth')

const {usersSavedRacingsDAO} = require('../database')


router.post('/create', passport.isBearerAuthenticated, function(req, res){
    const req_userId = req.body.userId
    const req_racingId = req.body.racingId

    if(req_userId != null && req_userId != null){
        usersSavedRacingsDAO.create({
            user_id: req_userId,
            racing_id: req_racingId
        }).then(
            res.send('ok')
        ).catch(err=>{
            console.log('[Error routes/users_saved_racings create]\n', err)
            res.status(500).send('Internal error')
        })
    }
    else{
        console.log('Error on /create users_saved_racings. Req.body null values')
        res.status(400).send("Error on /create users_saved_racings")
    }
})

router.post('/delete', passport.isBearerAuthenticated, function(req, res){
    const req_userId = req.body.userId
    const req_racingId = req.body.racingId

    if(req_userId != null && req_userId != null){
        usersSavedRacingsDAO.destroy({
            where: {
                user_id: req_userId,
                racing_id: req_racingId
            }
        }).then(
            res.send('ok')
        ).catch(err=>{
            console.log('[Error routes/users_saved_racings delete]\n', err)
            res.status(500).send('Internal error')
        })
    }
    else{
        console.log('Error on /delete users_saved_racings. Req.body null values')
        res.status(400).send("Error on /delete users_saved_racings")
    }
})

router.get('/getRacingsSavedByUser/:userId', passport.isBearerAuthenticated, function(req, res){
    userId = req.params.userId

    usersSavedRacingsDAO.findAll({
        where: {
          user_id: userId
        }
      }).then(racings=>{
        let total_races = []
        for(let race of racings){
            total_races.push(race)
        }
        res.send(total_races)
    })
    .catch(error=>{
        console.log('[Error] routes/racing getAllRacings\n', error)
        res.status(500).send('Internal error')
    })

})




module.exports = router