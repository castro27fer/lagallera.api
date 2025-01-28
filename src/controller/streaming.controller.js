
const { room } = require('../modules/room.js');
const { get_token, verify_token,secret_key } = require("../modules/jwt");
const {exception, STATUS} = require("../exception.js");
const { STREAMS } = require("../bd/database.js");

const create_streaming = async(req,res) =>{

    try{
        const { title, description } = req.body;
        
        const auth = req["AUTH"];
        
        let neewRoom = new room(title,description,auth);
        STREAMS.push(neewRoom);
        
        console.log(`CREATE STREAM: ${neewRoom.id} created streaming`);

        res.status(STATUS.OK).json({
            message:"Streming created with exit.",
            validations:[],
            streamingId:neewRoom.id
        });
    }
    catch(err){

        const ex = exception(err);
        console.log(ex);
        res.status(ex.status).json(ex);
    };
}

const getStreaming = async(req,res) =>{

    try{
        const { streamingId } = req.params;
        
        const streaming = STREAMS.find(x=> x.id === parseInt(streamingId));
        
        if(!streaming){
            res.status(STATUS.NOT_FOUND).json({message:"Streaming not found..",validations:[]}); return;
        }



        
        const auxStreaming = {
            id:streaming.id,
            title:streaming.title,
            description:streaming.description
        }

        // console.log("Este es el error", streaming);
        res.status(STATUS.OK).json({message:"success", streaming : auxStreaming});
    }
    catch(err){
        const ex = exception(err);
        console.log(ex);
        res.status(ex.status).json(ex);
    }
    
}

module.exports = {
    create_streaming,
    getStreaming
}