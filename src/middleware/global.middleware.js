const { get_token, verify_token,secret_key }  = require("../modules/jwt.js");
const {exception, STATUS} = require("../exception.js");

const authentication = async(req,res,next)=>{

    try{
        
        const token = get_token(req);
        const auth = await verify_token(token,secret_key);

        req["AUTH"] = auth;

        next();
    }
    catch(err) {
        const ex = exception(err);
        res.status(STATUS.UNAUTHORIZED).json(ex);
    }
    
}

const webSocketSecure = async(socket,next)=>{
    
   try{

    const token = socket.handshake.query.token;
    console.log("datos para validar token",token,secret_key)
    await verify_token(token,secret_key);
    next(); return; 

   }
   catch(err){

    if(err.name === "TokenExpiredError"){
        console.log("si foy sesion expirada..")
    }
    console.error("este es el erro que vfeo",err);
    // socket.emit("connect_error", { message: "Ocurrio un error inesperado al establecer la conexión al envivo." });
    socket.disconnect();

   }
   

}

module.exports = {
    authentication,
    webSocketSecure
}