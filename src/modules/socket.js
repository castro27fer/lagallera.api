const { Server } = require('socket.io');

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

    IO.on('connection', (socket) => {

        console.log('a user connected',socket.id);
    
        clients.push({
            id:socket.id
        });
        // socket.on("users",desc =>{
        //     socket.broadcast.emit("users",)
        // })
    
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

module.exports = {
    createSocketIO,
    rooms
}

