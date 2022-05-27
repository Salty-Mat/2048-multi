const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let userCount = 0

io.on('connection', (socket) => {
    console.log('a user connected');
    userCount++;
    socket.broadcast.emit("connected", userCount);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('dc', userCount);
        userCount--;
    });
    
    socket.on('message', (message) =>     {
        message['userCount'] = userCount;
        console.log(message);
        socket.broadcast.emit('message', message);
           
    });
    
});


http.listen(8080, () => console.log('listening on http://localhost:8080') );