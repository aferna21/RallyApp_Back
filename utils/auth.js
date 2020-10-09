const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const { userDAO, organizerDAO } = require('../database');

//codigo repetido, esta ya en user
const getOrganizerByUserId = user_id => organizerDAO.findOne({ where: { user_id } })

passport.use('bearer', new BearerStrategy(async function(accessToken, callback){
    const user = await userDAO.findOne({
        where:{
            token: accessToken
        }
    })
    .catch(function (e){
        console.error('[ERROR auth/bearer]', e)
        return callback(null, false);
    })
    
    return callback(null, user)
}))

const organizerAuthenticatedFunction = async function(accessToken, callback){
    try {
        const user = await userDAO.findOne({
            where:{
                token: accessToken
            }
        })

        if(!user){
            return callback(null, false)
        }
        
        getOrganizerByUserId(user.id).then(organizer=>{
            if (organizer) {
                user.organizerId = organizer.id
                return callback(null, user)
            }

            return callback(null, false)
        })
    } catch (e) {
        console.error('[ERROR auth/organiizer]', e)
        return callback(null, false)
    }
}

passport.use('organizer', new BearerStrategy(organizerAuthenticatedFunction))

module.exports = {
    isBearerAuthenticated: passport.authenticate('bearer', { session: false }),
    isOrganizerAuthenticated: passport.authenticate('organizer', {session: false}),
    organizerAuthenticatedFunction
}