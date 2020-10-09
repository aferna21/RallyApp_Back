// Data for Live-view of the rally, and past rallyes

const express = require('express')
const router = express.Router()
const passport = require('../utils/auth')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const {
    racingDAO,
    circuitDAO,
    competitorsRacingDAO,
    competitorDAO,
    eventsRacingDAO,
    timingDAO,
    classificationDAO
} = require('../database')

router.get('/data/:raceId', passport.isBearerAuthenticated, async function(req, res){
    const raceId = req.params.raceId
    try {
        const race = await racingDAO.findOne({ where: { id: raceId } })

        // Como no se pueden hacer joins con referencias de Sequelize, hay que hacer esta chapuza :)
        let competitors = [],
            events = [],
            timings = [],
            classifications = []

        // Hacer todo esto en paralelo con Promise.all()
        const competitorsRacing = await competitorsRacingDAO.findAll({
            where: { racing_id: raceId } })
        if (competitorsRacing && competitorsRacing.length) {
            const competitorIds = competitorsRacing.map(c => c.competitor_id)
            competitors = await competitorDAO.findAll({
                // Se busca en todo el array de ids
                where: { id: { [Op.in]: competitorIds } } })
        }

        const eventsRacing = await eventsRacingDAO.findAll({
            where: { racing_id: raceId },
            order: [['start_hour', 'ASC']]
        })
        if (eventsRacing && eventsRacing.length) {
            events = eventsRacing
        }

        const timingsRacing = await timingDAO.findAll({
            where: { racing_id: raceId },
            order: [['id', 'DESC']]
        })
        if (timingsRacing && timingsRacing.length) {
            timings = timingsRacing
        }

        const classificationsRacing = await classificationDAO.findAll(
            { where: { racing_id: raceId } })
        if (classificationsRacing && classificationsRacing.length) {
            classifications = classificationsRacing
        }

        const returnData = {
            name: race.racing_name,
            date: race.date,
            circuit_id: race.circuit_id,
            inProgress: race.in_progress,
            competitors,
            events,
            timings,
            classifications
        }
        res.json(returnData)
    } catch(e) {
        console.error("[ERROR rally/data/:rallyid]", e)
        res.status(500).send("Internal error")
    }
})

router.get('/getCircuitGeom/:rallyid', passport.isBearerAuthenticated, async function(req, res){
    try {
        const race = await racingDAO.findOne({ where: { id: req.params.rallyid } })
        const circuit = await circuitDAO.findOne({ where: { id: race.circuit_id } })
        res.json(circuit)
        
    } catch(e) {
        console.error("[ERROR rally/getCircuitGeom/:rallyid]", e)
        res.status(500).send("Internal error")
    }
})

router.post('/startRace', passport.isOrganizerAuthenticated, async function(req, res){
    const raceId = req.body.raceId
    try {
        const race = await racingDAO.findOne({ where: { id: raceId } })
        if (race.organizer_id !== req.user.organizerId) {
            res.status(401).send('Unauthorized')
            return
        }
        race.update({ in_progress: true })
        //TODO: añadir un campo a la BD para indicar si una carrera está en curso o no
        // Para los usuarios que entren a una carrera después de que el organizador mande este msg
        const socketRoom = 'race' + raceId
        console.log(`El organizador con id ${req.user.organizerId} ha comenzado la carrera con id ${raceId}`)
        io.sockets.in(socketRoom).emit('event', { eventName: 'raceStarted' })
        res.send('ok')
    } catch(e) {
        console.error("[ERROR rally/startRace]", e)
        res.status(500).send("Internal error")
    }
})

router.post('/endRace', passport.isOrganizerAuthenticated, async function(req, res){
    const raceId = req.body.raceId
    try {
        const race = await racingDAO.findOne({ where: { id: raceId } })
        if (race.organizer_id !== req.user.organizerId) {
            res.status(401).send('Unauthorized')
            return
        }
        race.update({ in_progress: false })
        const socketRoom = 'race' + raceId
        console.log(`El organizador con id ${req.user.organizerId} ha terminado la carrera con id ${raceId}`)
        io.sockets.in(socketRoom).emit('event', { eventName: 'raceEnded' })
        res.send('ok')
    } catch(e) {
        console.error("[ERROR rally/endRace]", e)
        res.status(500).send("Internal error")
    }
})

// La adición de nuevos tiempos se encuentra en utils/socket.js


module.exports = router