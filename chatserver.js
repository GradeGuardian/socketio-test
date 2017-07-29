const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = 8000

io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('add-message', (message) => {
        
    })
})

http.listen(port, () => {
    console.log('Server started on port ', port)
})