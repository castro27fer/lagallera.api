const c = require("../controller/socket.controller");
const m = require("../middleware/global.middleware");

module.exports = (socket,IO) =>{

    socket.on("create_streaming", (params) => c.create_streaming(socket,params));

    socket.on("sendMessage", (params) => c.sendMessage(socket,IO,params));

    socket.on("send_offer_of_connection",(params) => c.send_offer_of_connection(socket,params));

    socket.on("send_answer_of_connection", (params) => c.send_answer_of_connection(socket,params));

    socket.on("send_candidates_of_connection", (params) => c.send_candidates_of_connection(socket,params));
    
    socket.on("disconnecting", (params) => c.disconnecting(socket,params));

    socket.on('disconnect', (params) => c.disconnect(socket,params));

}