const app = require('./src/app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./src/socket')(io);

server.listen(app.get('port'), () => {
    console.info(`Server on port ${app.get('port')}`);
});