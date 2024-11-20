const { Server } = require('socket.io');
const { room } = require('./room');

const FRONTEND = process.env.APP_HOST;

let IO = null;
let clients = [];
let rooms = [];

const createSocketIO = (server)=>{

    IO = new Server(server,{
        cors:{
            origin:FRONTEND
        }
    });

    connectWithClient();

}

const connectWithClient = () =>{

    IO.on('connection', (socket) => {

        console.log('a user connected',socket.id);
    
        clients.push(socket);

        socket.on("create_streming",(props)=>{
            const neewRoom = new room(props.title,props.description,socket);
            rooms.push(neewRoom);
        });

        socket.on("chat_room",(params) =>{
            const room_streaming = rooms.find(x => x.id === socket.data.roomId);
            IO.to(room_streaming.room).emit("message",params.message);
        });

        socket.on("send_offer_of_connection",(params)=>{

            //aqui debo continuar.......

        })

        socket.on("offer", desc => {
            
            // console.log("offer: ", desc);
            socket.broadcast.emit("getOffer", desc);
    
        });
    
        socket.on("answer", desc => {
            
            // console.log("answer: ",desc);
            socket.broadcast.emit("getAnswer", desc);
        });
    
        socket.on("candidate", candidate => {
            socket.broadcast.emit("candidate", candidate);
            // console.log("candidate: ",candidate);
        });
    
    
    
        socket.on("ROOM_CLIENT_001",(data) =>{
            socket.broadcast.emit(data);
        })

        socket.on("disconnecting", () => {
            console.log(socket.rooms); // the Set contains at least the socket ID
          });
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    
    });

}

//eventos
const roomsOfStreming = (socket)=>{

    //event create streming
    socket.on("createStreming", (socket) => {
        const streaming = new room("TEST STREMING",`ROOMCHAT_${socket.id} testing streming`,socket);
        rooms.push(streaming);
    });

    socket.on("closeStreming",(socket)=>{

        const room = rooms.find(x=>x.streming.id === socket.id);
        room.close();
    });

}

const roomsOfClients = (socket)=>{

    socket.on("connectStreming",(props)=>{

    })


}

module.exports = {
    createSocketIO,
    rooms
}

