const express = require('express')
const router = express.Router()
const passport = require('../utils/auth')

const {racingDAO, events_racingDAO} = require('../database')


router.post('/create', passport.isOrganizerAuthenticated, function(req, res){
    const req_description = req.body.description
    const req_time = req.body.time //con pasar 19:30 vale
    const req_racing_name = req.body.racing_name
    racingDAO.findOne({where: {racing_name: req_racing_name}}).then(racing =>{
        const req_racing_id = racing.id
        events_racingDAO.create({
            description: req_description,
            time: req_time,
            racing_id: req_racing_id
        }).then(
            res.send('OK')
        ).catch(err=>{
            console.log('[Error routes/events_racing create]\n', err)
            res.status(500).send('Internal error')
        })
    }).catch(err=>{
        console.log('[Error routes/events_racing create]\n', err)
        res.status(400).send('Nombre de carrera no válido')
    })

})


router.get('/getEventsOf/:racing_name', passport.isBearerAuthenticated, function(req, res){
    const req_racing_name = req.params.racing_name
    racingDAO.findOne({where: {racing_name: req_racing_name}}).then(racings=>{
        const req_racing_id = racings.id
        events_racingDAO.findAll({where: {racing_id: req_racing_id}}).then(events=>{
            res.send(events)
        }).catch(e=>{
            console.log('[Error] routes/events_racing getEventsOf\n', e)
            res.status(500).send('Internal error')
        })
    }).catch(e=>{
        console.log('[Error] routes/events_racing getEventsOf\n', e)
        res.status(400).send('Nombre de carrera no valido')
    })
})











module.exports = router