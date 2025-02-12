
const { room } = require('../modules/room.js');
const {exception, STATUS} = require("../exception.js");
const { STREAMS } = require("../bd/database.js");
const Certificate = require("../modules/certificate.js");

const create_streaming = async(req,res) =>{

    try{
        // const { title, description,certificate } = req.body;
        const { title, description } = req.body;
        
        const certificate = new Certificate();
        const auth = req["AUTH"];
        
        // console.log("I'm certificate",certificate)
        let neewRoom = new room(title,description,auth,certificate);
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

        const certificate = streaming.certificate.generateCertificate();
        console.log("obtener certificado",certificate)
        
        const auxStreaming = {
            id:streaming.id,
            title:streaming.title,
            description:streaming.description,
            certificate:certificate,
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


const keygenAlgorithm222 = async(req,res) =>{

    try{

        res.status(STATUS.OK).json({
            keygenAlgorithm:JSON.stringify({
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: 2048,
                publicExponent: [0x01, 0x00, 0x01],
                hash: "SHA-256"
            }),
        });

        // res.status(STATUS.OK).json({message:"hola"});

    }
    catch(err){
        const ex = exception(err);
        console.log(ex);
        res.status(ex.status).json(ex);
    }
}

module.exports = {
    create_streaming,
    getStreaming,
    keygenAlgorithm222
}