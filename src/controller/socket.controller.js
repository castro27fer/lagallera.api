
let rooms = [];

const createRoom = async(req,res) =>{
    console.log("request createRoom");

    
    res.status(200).json({ room:"" })
}


module.exports = {
    createRoom
}