const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const passport = require('../utils/auth')
const saltRounds = 10

// const jwt = require('express-jwt')

const { userDAO, organizerDAO, racingDAO } = require('../database');

const tokenGen = size => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, function (err, buffer) {
      if (err) {
        reject(err)
        return
      }
      resolve(buffer.toString('hex'))
    })
  })
}

const getOrganizerByUserId = user_id => organizerDAO.findOne({ where: { user_id } })

router.post('/register', async function(req, res){
  //const { username, password, first_name, second_name, region, email } = req.body
  const { username, password, email } = req.body

  // This fields cannot be null
  const first_name = ''
  const second_name = ''
  const region = ''
  
  const paramsOK = username && password && email
  if (!paramsOK) {
    res.status(400).send('Error al registrar usuario: parametros incorrectos')
    return
  } 

  bcrypt.hash(password, saltRounds, async function(err, hash){
    const token = await tokenGen(48)
    .catch(error => console.log('[ERROR user/register tokenGen]', error))
    await userDAO.create({
      username,
      password: hash,
      first_name,
      second_name,
      region,
      email,
      token
    }).catch(error=>{
      console.log('[ERROR user/register create user]', error)
      res.status(400).send('Error en la autenticación')
      return
    })
    res.json({ status: 'ok', token })
  })
})


router.post('/auth', async function(req, res){
  const username = req.body.username
  const password_uncrypt = req.body.password
  const user = await userDAO.findOne({
    where: {
      username: username
    }
  })
  .catch(error => {
    console.log('[ERROR user/auth findOne]', error)
  })

  if (!user){
    res.status(400).send('Nombre de usuario o contraseña incorrectos.')
    console.log('Nombre de usuario o contraseña incorrectos.')
    return
  }

  const password_crypt = user.dataValues.password
  bcrypt.compare(password_uncrypt, password_crypt).then(resp => {
    if(resp){
      tokenGen(48)
      .then(async token => {
        await userDAO.update(
          { token }, { where: { id: user.get('id') } }
        )
        getOrganizerByUserId(user.id).then(async organizer => {
          let organizerIn = []
          if(organizer){
            let races = await racingDAO.findAll({
              where: { organizer_id: organizer.id }
            })
            organizerIn = races.map(r => r.id)
          }
          res.json({status: 'ok', token, organizerIn})
        })
        
      })
    }else{
      res.status(404).send("Usuario o contraseña incorrectos")
    }
  })
  .catch(e=>{
    console.log("[Error routes/user auth\n", e)
    res.status(500).send('Internal error')
  })
})




router.get('/getUser/:username', passport.isBearerAuthenticated, async function(req, res) { 
  const req_username = req.params.username
  let error = false
  const user = await userDAO.findOne({
    attributes: ['id', 'username', 'first_name', 'second_name', 'email', 'photo'],
    where: {'username': req_username}
  })
  .catch(e => {
    res.status(500).send('Internal error')
    error = true
    console.log('Error user/getUser find by username', e)
  })
  if(!error){
    if(!user){
      res.status(404).send('User not found')
    } else res.send(user)
  }
})

router.post('/modifyProfile/', passport.isBearerAuthenticated, async function(req, res){
  const name = req.body.username
  const surname = req.body.usersurname

  req.user.update({ 
    first_name: name, 
    second_name: surname 
  })
  .catch(e => {
    res.status(500).send('Internal error')
    console.log('Error user/postInfo', e)
  })
  
  res.json({ status: 'ok'})
})

/* router.get('/isOrganizer/:id', passport.isBearerAuthenticated, async function(req, res){
  id = req.params.id
  is_organizer = await isOrganizer(id)
  res.send(is_organizer)
}) */

module.exports = router