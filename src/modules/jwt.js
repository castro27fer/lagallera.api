const jwt = require("jsonwebtoken");

// const AWAIT_TIME = process.env.RESENT_CODE_VERIFY;

const generate_token = async(data,secret_key,expired) => {

    return new Promise((resolve, reject) =>{

        console.log("time token",expired)
        jwt.sign(data,secret_key,{ expiresIn: expired }, (err,token) => {
                
            if(err){
                reject(err); return;
            }
    
            resolve(token);
        });
    });
}

const verify_token = (token,secret_key) =>{

    return new Promise((resolve, reject) =>{
        jwt.verify(token,secret_key,(error,data)=>{
            
            if(error) { reject(error); return;}

            resolve(data);
            
        });
    });
    
}

const get_token = (req) =>{
    const header = req.headers["authorization"];

    if(typeof header == "undefined"){
        throw("Not autorized")
    }

    return header.split(" ")[1];
}

module.exports = { generate_token,verify_token,get_token }