
const { room } = require('../modules/room');

const create_streaming = (socket,props) =>{

    const neewRoom = new room(props.title,props.description,socket);
    rooms.push(neewRoom);
    console.log(`CREATE STREAM: ${socket.id} created streaming`)

}

const sendMessage = (socket,params) =>{

    const room_streaming = rooms.find(x => x.id === socket.data.roomId);
    console.log(`Socket ${socket.id} send message to room ${room_streaming.room}`,params);
    IO.in(room_streaming.room).emit("message",params);

}

const send_offer_of_connection = (socket,params)=>{

    const { desc, streamingId } = params;
    IO.in(streamingId).emit("offers_of_connection",{ desc, socketId : socket.id });
    console.log(`OFFER: ${socket.id} send offer from ${streamingId}`);

}

const send_answer_of_connection = (socket,params) =>{

    const { desc, socketId } = params;
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
    create_streaming,
    sendMessage,
    send_offer_of_connection,
    send_answer_of_connection,
    send_candidates_of_connection,
    disconnecting,
    disconnect
}