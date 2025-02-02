const { CLIENTS, STREAMS } = require("../bd/database");


const STATUS = {
    CREATED:"created",
    FULL:"full",
    CLOSE:"close",
};

class room {

    id = null;
    state = null;
    title = null;
    description = null;
    room = null;
    socket = null;
    sockets = [];
    clients = [];
    emisor = null;
    certificate = null;

    constructor(title,description,emisor,certificate){

        this.state = STATUS.CREATED;
        this.title = title;
        this.description = description;
        
        this.emisor = emisor;
        this.certificate = certificate;

        const getRndInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min) ) + min;
          }

        this.id = getRndInteger(10000,99999);

        this.room = `ROOM_${this.id}`;

    }

    setEmisor(socket){

        socket.data = {
            streamingId : this.id,
        }
        
        socket.join(this.room);

        this.socket = socket;
        this.sockets.push(this.socket);
        
    }


    addClient = (socket)=>{

        socket.data = {
            streamingId : this.id,
        }

        socket.join(this.room);
        CLIENTS.push(socket);
        this.clients.push(socket);
        this.sockets.push(socket);

    }

    getClient = (socketId) =>{
        return this.sockets.find(x => x.id === socketId);
    }

}

module.exports = { room }