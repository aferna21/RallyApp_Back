const express = require('express')
const router = express.Router()
const passport = require('../utils/auth')

const {circuitDAO, organizerDAO, racingDAO} = require('../database')

router.post('/create', passport.isOrganizerAuthenticated, function(req, res){
    const req_date = req.body.date //2020-05-26T18:31:25.125Z
    const req_racing_name = req.body.racing_name
    const req_circuit_name = req.body.circuit_name
    const req_type = req.body.type
    const req_organizer_id = req.body.organizer_id

    circuitDAO.findOne({
        where: {name: req_circuit_name}
    }).then(circuit =>{
        const req_circuit_id = circuit.id
        racingDAO.create({
            date: req_date,
            racing_name: req_racing_name,
            circuit_id: req_circuit_id,
            type: req_type,
            organizer_id: req_organizer_id
        }).then(
            res.send('OK')
        )
        .catch(error=>{
            console.log('[Error] routes/racing create error al crear carrera\n', error)
            res.status(500).send('Internal error')
        }) 
        
    })
    .catch(error=>{
        console.log('[Error] routers/racings create circuito no encontrado\n', error)
        res.status(400).send('Circuito no válido')
    })
})




router.get('/getRacings/:year/:month', passport.isBearerAuthenticated, function(req, res){
    const req_year = req.params.year
    const req_month = req.params.month
    racingDAO.findAll().then(racings=>{
        let filtered_races = []
        for(let race of racings){
            if(race.date.getFullYear() == req_year  &&  (race.date.getMonth()+1) == req_month){
                filtered_races.push(race)
            }
        }
        res.send(filtered_races)
    })
    .catch(error=>{
        console.log('[Error] routes/racing getRacings\n', error)
        res.status(500).send('Internal error')
    })

})

router.get('/getAllRacings', passport.isBearerAuthenticated, function(req, res){
    racingDAO.findAll().then(racings=>{
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