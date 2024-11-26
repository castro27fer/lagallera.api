
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
    emisor = null;
    clients = [];

    constructor(title,description,socket){

        this.id = socket.id;
        this.state = STATUS.CREATED;
        this.title = title;
        this.description = description;
        this.room = `ROOM_${socket.id}`
        this.emisor = socket;

        this.emisor.data.roomId = this.id;

        this.emisor.join(this.room);  

    }



    sendMessage = (message) =>{

    }




}

module.exports = { room }