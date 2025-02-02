const { generate_token,secret_key, SESSION_EXPIRATION } = require("../modules/jwt");
const { STREAMS } = require("../bd/database");
const {exception, STATUS} = require("../exception.js");

const get_acces_to_streaming = async(req,res) =>{
   
    try{
        const { streamingId } = req.params;

        //get Streaming
        const streaming = STREAMS.find(x => x.id === parseInt(streamingId));
        if(!streaming){
            res.status(STATUS.NOT_FOUND).json({message:"the streaming is not found."}); return;
        }

        const user = {
            name:"desconocido"
        };

        //generate token access from user public
        const token = await generate_token(user,secret_key,SESSION_EXPIRATION);
        // console.log("certificado en room",streaming)
        res.status(STATUS.OK).json({
            token,
            user,
            streaming: {
                id: streaming.id,
                title: streaming.title,
                description: streaming.description,
                certificate:streaming.certificate
            }
        });
    }
    catch(err){
        const ex = exception(err);
        console.log(err);
        res.status(ex.status).json(ex);
    }
}
module.exports = {
    get_acces_to_streaming
}