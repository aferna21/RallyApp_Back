const express = require('express')
const router = express.Router()
const passport = require('../utils/auth')

const { competitorDAO, userDAO } = require('../database')

router.post('/create', passport.isOrganizerAuthenticated, async function(req, res){
    const req_name = req.body.name
    const req_second_name = req.body.second_name
    const req_region = req.body.region
    const req_photo = req.body.photo
    const req_username = req.body.username
    let competitor_created = null

    competitor_created= await competitorDAO.create({
        first_name: req_name,
        second_name: req_second_name,
        region: req_region,
        photo: req_photo
    })
    .catch(error =>{
        console.log('[Error routes/competitor create\n', error)
        res.status(400).send("Error al crear el circuito")
    })

    let user = null
    user = await userDAO.findOne({
        where: {username: req_username}
    })
    .catch(error=>{
        console.log('[Error routes/competitor create\n', error)
        res.status(400).send("Error al crear el circuito")
    })

    if(user){
        /* await user.update({
            competitor_id: competitor_created.dataValues.id
        }) */
        res.send('OK')
    }else{
        res.status(400).send("Username no valido")
    }
    

})

router.get('/getCompetitor/:firstname/:secondname/:region', passport.isBearerAuthenticated, async function(req, res){
    const req_firstname = req.params.firstname
    const req_secondname = req.params.secondname
    const req_region = req.params.region
    let competitor = null
    let error=false
    competitor = await competitorDAO.findOne({
        where: {
            first_name: req_firstname,
            second_name: req_secondname,
            region: req_region
        }
    })
    .catch(e=>{
        console.log('[Error] routes/competitor getCompetitor\n', e)
        res.status(500).send('Error interno')
        error=true
        
    })
    if(!error){
        let resp = null
        if(competitor){
            resp = competitor
        }else{
            resp='Competidor no encontrado'
        }
        res.send(resp)
    }
    
})


module.exports = router