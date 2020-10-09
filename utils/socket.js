
const { racingDAO, timingDAO } = require('../database')
const auth = require('../utils/auth')


const newTime = function(message) {
    // Token viaja sin cifrar en websockets?
    const { raceId, token, competitor_id, timing } = message
    try {
        auth.organizerAuthenticatedFunction(token, async (nullarg, user) => {
            if (!user) {
                console.error("[ERROR socket/newTime], usuario sin permisos", message)
                return
            }
            const race = await racingDAO.findOne({ where: { id: raceId } })
            if (race.organizer_id !== user.organizerId) {
                console.error("[ERROR socket/newTime], usuario sin permisos", message)
                return
            }
            
            await timingDAO.create({ timing, category: 'x', racing_id: raceId, competitor_id })
            const socketRoom = 'race' + raceId
            io.in(socketRoom).emit('time', { competitor_id, timing })
            console.log(competitor_id, timing)
        })
    } catch(e) {
        console.error("[ERROR socket/newTime]", e)
    }
}

module.exports = { newTime }