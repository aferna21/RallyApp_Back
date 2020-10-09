const circuit = require('./models/circuit.js')
const classification = require('./models/classification.js')
const competitor = require('./models/competitor.js')
const competitorsRacing = require('./models/competitors-racing.js')
const organizer = require('./models/organizer.js')
const racing = require('./models/racing.js')
const timing = require('./models/timing.js')
const user = require('./models/user.js')
const eventsRacing = require('./models/events_racing')
const usersSavedRacings = require('./models/users_saved_racings')

const syncOptions = { alter: true }


/* classification.hasMany(competitor)
classification.hasOne(racing, { foreignKey: 'racing_id' })
organizer.belongsTo(user)
timing.hasOne(racing, { foreignKey: 'racing_id' })
timing.hasOne(competitor, { foreignKey: 'competitor_id' })
organizer.belongsTo(racing, { foreignKey: 'organizer_id' })
circuit.belongsTo(racing, { foreignKey: 'circuit_id' })
 */

circuit.sync(syncOptions)
classification.sync(syncOptions)
competitor.sync(syncOptions)
competitorsRacing.sync(syncOptions)
organizer.sync(syncOptions)
racing.sync(syncOptions)
timing.sync(syncOptions)
user.sync(syncOptions)
eventsRacing.sync(syncOptions)
competitorsRacing.sync(syncOptions)
usersSavedRacings.sync(syncOptions)

module.exports = { 
    circuitDAO: circuit,
    classificationDAO: classification,
    competitorDAO: competitor,
    competitorsRacingDAO: competitorsRacing,
    organizerDAO: organizer,
    racingDAO: racing,
    timingDAO: timing,
    userDAO: user,
    eventsRacingDAO: eventsRacing,
    competitorsRacingDAO: competitorsRacing,
    usersSavedRacingsDAO: usersSavedRacings
}