const express = require('express')
const app = require('express')()
const server = require('http').Server(app)
const requestify = require('requestify')
const io = require('socket.io')(server)

const port = 7000

io.on('connection', (socket) => {
    console.log('User connected', socket.id)

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('message', (message) => {
        console.log('Got message: ', message)
        
        socket.emit('message-success', { })
    })

    console.log('Sending welcome')
    socket.emit('message', newMessage('Hi, I\'m Desiree.'))

    setTimeout( () => {
        socket.emit('message', newMessage("I love Chuck Norris jokes, I sure hope you do too."))

        setTimeout( () => {
            setInterval(() => {
                requestify.get('http://api.icndb.com/jokes/random').then( res => {
                    res.getBody()
                    let data = JSON.parse(res.body)
                    socket.emit('message', newMessage(data.value.joke))
                })
            }, 8000)
        }, 1000)
    }, 2000)
    
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


server.listen(port, () => {
    console.log('Server started on port ', port)
})

function newMessage(text) {
    return {
        message: text,
        isSenderServer: true,
        sent: true
    }
}