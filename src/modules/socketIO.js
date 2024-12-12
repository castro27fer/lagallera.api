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

        console.log('user connected',socket.id);
    
        clients.push(socket);

        socket.on("create_streaming",(props)=>{
            const neewRoom = new room(props.title,props.description,socket);
            rooms.push(neewRoom);
            console.log(`CREATE STREAM: ${socket.id} created streaming`)
        });

        socket.on("sendMessage",(params) =>{
            const room_streaming = rooms.find(x => x.id === socket.data.roomId);
            console.log(`Socket ${socket.id} send message to room ${room_streaming.room}`,params);
            IO.in(room_streaming.room).emit("message",params);
        });

        socket.on("send_offer_of_connection",(params)=>{
            const { desc, streamingId } = params;
            IO.in(streamingId).emit("offers_of_connection",{ desc, socketId : socket.id });
            console.log(`OFFER: ${socket.id} send offer from ${streamingId}`);
        });

        socket.on("send_answer_of_connection",params =>{
            const { desc, socketId } = params;
            IO.in(socketId).emit("answer_of_connection",{ desc });
            console.log(`ANSWER: ${socket.id} send answer from ${socketId}`);
        });

        socket.on("send_candidates_of_connection", params => {
            const { socketId, candidate } = params;
            IO.in(socketId).emit("candidates_of_connection", { candidate, socketId :  socket.id });
            console.log(`CANDIDATES: ${socket.id} send candidates from ${socketId}`)
        });
    
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
    rooms,
    IO
}

