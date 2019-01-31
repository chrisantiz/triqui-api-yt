const users = [];
function getIndex(id) {
    return users.findIndex(user => user.id === id);
}
module.exports = io => {
    io.on('connection', socket => {
        socket.emit('usersonline', users);

        socket.on('adduser', nick => {
            const user = {
                id: socket.id,
                nick,
                play: false
            };
            socket._user = user;
            users.push(user);
            socket.broadcast.emit('adduser', user);
            socket.emit('addmyuser', user);
        });

        socket.on('nextturn', ({ id, index }) => {
            socket.to(id).emit('nextturn', index);
        });

        socket.on('changestate', () => {
            const index = getIndex(socket.id);
            if (index !== -1){
                users[index].play = !users[index].play;
                socket.broadcast.emit('changestate', socket.id);
            }
        });

        socket.on('challenge', id => {
            socket.to(id).emit('challenge', socket._user);
        });

        socket.on('challangeresponse', ({ res, id }) => {
            socket.to(id).emit('challangeresponse', { res, player: socket._user });
        });

        socket.on('disconnect', () => {
            const index = getIndex(socket.id);
            if (index !== -1) {
                users.splice(index, 1);
                socket.broadcast.emit('leftuser', socket.id);
            }
        });
    });
};