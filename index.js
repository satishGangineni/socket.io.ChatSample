const express = require('express');
var socket = require('socket.io');
const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Hello World!'))

var server = app.listen(port, () => console.log(`Server is listening on port ${port}!`))

//Static files
app.use(express.static('public'));

//socket setup.

var io = socket(server);

io.on("connection", (socket)=>{

    console.log(`made socket connection. ${socket.id}`);
    //console.log(socket);

    socket.on('chat',(data)=>{
        io.sockets.emit('chat', data);
        console.log(data);
    });

    socket.on('KeyPress',(data)=>{
        
        socket.broadcast.emit('typing', data); //emits to everyone but socket
        //io.sockets.emit('chat', data);
        //console.log(data);
    });


});
