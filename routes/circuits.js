const express = require('express')
const router = express.Router()
const passport = require('../utils/auth')


const { circuitDAO } = require('../database')

router.post('/createCircuit', passport.isOrganizerAuthenticated, async function(req, res){
    const req_location = req.body.location
    const req_tracing = req.body.tracing
    const req_name = req.body.name
    await circuitDAO.create({
        name: req_name,
        tracing: req_tracing,
        location: req_location
    })
    .catch(error => {
        console.log("[ERROR: user/regiter createCircuit]\n", error)
        res.status(400).send("Error al crear el circuito")
    })
    res.json({status: "ok"})
})

router.get('/get/:name', passport.isOrganizerAuthenticated, async function(req, res){
    const req_name = req.params.name
    let circuito = null
    circuito = await circuitDAO.findOne({
        where: {name: req_name}
    })
    if(circuito){
        res.send(circuito)
    }else{
        res.send("NO")
    }
})



module.exports = router