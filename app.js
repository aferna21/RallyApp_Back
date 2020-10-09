// Error.stackTraceLimit = Infinity;
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const errorHandler = require('errorhandler')

app.use(errorHandler({ dumpExceptions: true, showStack: true }))
// Connect to ddbb
const ddbb = require('./database/connection.js')
ddbb.connection()

// API REST

/*ejemplo passport
En el header:
Key: Authorization
Value: "bearer _TOKEN_"

*/

/*********** ROUTES ***********/

const user = require('./routes/user')
const organizer = require('./routes/organizer')
const circuit = require('./routes/circuits')
const competitor = require('./routes/competitor')
const rallyData = require('./routes/rallydata')
const racing = require('./routes/racing')
const events_racing = require('./routes/events_racing')
const users_saved_racings = require('./routes/users_saved_racings')

app.use('/user', user)
app.use('/organizer', organizer)
app.use('/circuit', circuit)
app.use('/competitor', competitor)
app.use('/rally', rallyData)
app.use('/racing', racing)
app.use('/events_racing', events_racing)
app.use('/users_saved_racings', users_saved_racings)

const server = app.listen(3000, function () {
	console.log('RallyBack server listening on port 3000')
})

const io = require('socket.io')(server)

global.io = io
const socketListeners = require('./utils/socket.js')
io.on('connection', socket => {
	socket.on('room', function(room) {
		socket.join(room)
		console.log('[Sockets]', socket.id, 'joined room', room)
	})
	global.socket = socket
	// Assign message functions to the socket connection
	// Maybe a bad practice to do this for every connection?
	// TODO: monitor memory
	for (const message in socketListeners) {
		// console.log('initialize ', message, socketListeners[message])
		socket.on(message, socketListeners[message])
	}
})

