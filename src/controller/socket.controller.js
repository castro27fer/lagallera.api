

const { STREAMS } = require("../bd/database");
// const { IO } = require("../modules/socketIO");

const create_streaming = (socket,props) =>{

    try{
        const index = STREAMS.findIndex(x => x.id === props.streamingId);
        let room = STREAMS[index];
    
        room.setEmisor(socket);
        STREAMS[index] = room;
    
        console.log(`CREATE STREAM: ${socket.id} created streaming`)
    }
    catch(err){
        console.log(err);
        // socket.emit("connect_error", { message: "Ocurrio un error inesperado al establecer la conexión al envivo." });
        socket.disconnect(err);
    }
   

}

const sendMessage = (socket,IO,params) =>{

    try{
        const room_streaming = STREAMS.find(x => x.id === socket.data.streamingId);
        IO.in(room_streaming.room).emit("message",params);
        console.log(`Socket ${socket.id} send message to room ${room_streaming.room}`,params);
    }
    catch(err){
        console.log(err);
        // socket.emit("connect_error", { message: "Ocurrio un error inesperado al establecer la conexión al envivo." });
        socket.disconnect(err);
    }

}

const send_offer_of_connection = (socket,params)=>{

    try{
        const { desc, streamingId } = params;

        const index = STREAMS.findIndex(x => x.id === parseInt(streamingId));

        // socket.data.streamingId = streamingId;
        const room = STREAMS[index];
        if(!room){
            // socket.emit("connect_error", { message: "El envivo no fue encontrado." });
            socket.disconnect(`room ${streamingId} not found`); 
            console.log(`room ${streamingId} not found`); return;
        }
        
        room.addClient(socket);
        STREAMS[index].socket.emit("offers_of_connection",{ desc, socketId : socket.id });
        
        console.log(`OFFER: ${socket.id} send offer from the stream ${streamingId}`);
    }
    catch(err){
        console.log(err);
        // socket.emit("connect_error", { message: "Ocurrio un error inesperado al establecer la conexión al envivo." });
        socket.disconnect(err);
    }

}

const send_answer_of_connection = (socket,params) =>{

    try{
        const { desc, socketId } = params;

        const room = STREAMS.find(x =>x.id === parseInt(socket.data.streamingId));
        // console.log("socketId",socketId,"streamingId",socket.data.streamingId,"room",room)
        const socketClient = room.getClient(socketId);

        socketClient.emit("answer_of_connection",{ desc });
        // STREAMS[index].socket.emit("answer_of_connection",{ desc });

        console.log(`ANSWER: ${socket.id} send answer from ${socketId}`);
    }
    catch(err){
        console.log(err);
        // socket.emit("connect_error", { message: "Ocurrio un error inesperado al establecer la conexión al envivo." });
        socket.disconnect(err);
    }

}

const send_candidates_of_connection = (socket,params) => {

    try{
        const { socketId,candidate } = params;

        // console.log("CANDIDATES: socket "+ socket.id +" send candidates from ",socketId,"streaming id",socket.data.streamingId)
        const streamingId = socket.data.streamingId;

        const room = STREAMS.find(x => x.id === parseInt(streamingId));

        if(!room){
            socket.disconnect(`Streaming ${streamingId} not found.`);
            console.log(`Streaming ${streamingId} not found.`); return;
        }

        //soy el streaming
        if(socket.id === room.socket.id){

            let socketClient = room.getClient(socketId);
            socketClient.emit("candidates_of_connection", { candidate, socketId :  socket.id });
            console.log(`CANDIDATES: ${socket.id} send candidates from ${socketClient.id}`);
        }
        else{ // soy el receptor...
            room.socket.emit("candidates_of_connection", { candidate, socketId :  socket.id });
            console.log(`CANDIDATES: ${socket.id} send candidates from ${room.socket.id}`)
        }
    }
    catch(err){
        console.log(err);
        // socket.emit("connect_error", { message: "Ocurrio un error inesperado al establecer la conexión al envivo." });
        socket.disconnect(err);
    }

}

const disconnecting = (socket,params) => {
    console.log(socket.rooms); // the Set contains at least the socket ID
}

const disconnect = (socket,params) => {
    console.log(`user ${socket.id} disconnected`);
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