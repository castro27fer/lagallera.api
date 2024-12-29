const { compare, encrypt } = require('../modules/bcrypt');
const { users } = require("../bd/database");
const { generate_token,verify_token } = require("../modules/jwt");
const {exception, STATUS} = require("../exception.js");


const SECRET_KEY = process.env.JWS_SECRET_KEY;
const SESSION_EXPIRATION = process.env.SESSION_EXPIRATION;

const logIn = async(req,res)=>{

    try{
        const { email, password } = req.body;

        const user = users.find(x => x.email === email);

        if(!user){
            res.status(400).json({message:"La cuenta no fue encontrada.",validations:[]}); return;
        }

        if(!user.active){
            res.status(400).json({message:"La cuenta no esta activa.",validations:[]}); return;
        }
        
        const password_is_equal = await compare(password,user.password);

        if(!password_is_equal){
            res.status(400).json({message:"La contraseña es incorrecta.",validations:[]}); return;
        }

        const SESSION = { 
            email,
            userId:user.id, 
            date: Date.now()
        }
        //generate token session
        const token = await generate_token(SESSION,SECRET_KEY,SESSION_EXPIRATION);

        res.status(200).json({
            message:"Sessión Iniciada.",
            token:token,
            user:{
                name:user.name,
                lastName:user.lastName,
            }
        });
    }
    catch(err){
        const ex = exception(err);
        res.status(ex.status).json(ex);
    }
    
}

const logOut = async(req,res)=>{

}

const resetPassword = async(req,res)=>{

}

module.exports = {
    logIn, logOut, resetPassword
}