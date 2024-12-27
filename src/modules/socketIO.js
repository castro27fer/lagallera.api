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

    connectWithSocket();
 
}


const connectWithSocket = () =>{

    IO.on('connection', (socket) => {

        console.log('user connected',socket.id);

        socket.data = {
            name : "User " + socket.id,
            state : "Connected",
            roomId: null
        }
    
        clients.push(socket);

        socket.on("create_streaming", (params) => create_streaming(socket,params));

        socket.on("sendMessage", (params) => sendMessage(socket,params));

        socket.on("send_offer_of_connection",(params) => send_offer_of_connection(socket,params));

        socket.on("send_answer_of_connection", (params) => send_answer_of_connection(socket,params));

        socket.on("send_candidates_of_connection", (params) => send_candidates_of_connection(socket,params));
     
        socket.on("disconnecting", (params) => disconnecting(socket,params));
    
        socket.on('disconnect', (params) => disconnect(socket,params));
    
    });

}


const create_streaming = (socket,props) =>{

    const neewRoom = new room(props.title,props.description,socket);
    rooms.push(neewRoom);
    console.log(`CREATE STREAM: ${socket.id} created streaming`)

}

const sendMessage = async(socket,params) =>{

    const room_streaming = rooms.find(x => x.id === socket.data.roomId);
    console.log(`Socket ${socket.id} send message to room ${room_streaming.room}`,params);
    IO.in(room_streaming.room).emit("message",params);
    // console.log(await IO.in(room_streaming.room).fetchSockets())

}

const send_offer_of_connection = (socket,params)=>{

    const { desc, streamingId } = params;
    IO.in(streamingId).emit("offers_of_connection",{ desc, socketId : socket.id });
    socket.data.roomId = streamingId;
    console.log(`OFFER: ${socket.id} send offer from ${streamingId}`);

}

const getSocketById = async (id) =>{

    

}
const send_answer_of_connection = async(socket,params) =>{

    const { desc, socketId } = params;

    const sockets = await IO.fetchSockets();
    const room_streaming = rooms.find(x => x.id === socket.data.roomId);
    
    const client = sockets.find(x => x.id === socketId);

    room_streaming.addClient(client);

    IO.in(socketId).emit("answer_of_connection",{ desc });

    console.log(`ANSWER: ${socket.id} send answer from ${socketId}`);

}

const send_candidates_of_connection = (socket,params) => {

    const { socketId, candidate } = params;
    IO.in(socketId).emit("candidates_of_connection", { candidate, socketId :  socket.id });
    console.log(`CANDIDATES: ${socket.id} send candidates from ${socketId}`)

}

const disconnecting = (socket,params) => {
    console.log(socket.rooms); // the Set contains at least the socket ID
}

const disconnect = (socket,params) => {
    console.log('user disconnected');
}


module.exports = {
    createSocketIO,
    rooms,
    IO
}

