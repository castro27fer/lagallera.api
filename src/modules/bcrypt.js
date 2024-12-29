const bcrypt = require("bcrypt");

const encrypt = async(password) => {

    if(password !== ""){
        const salt_rounds = parseInt(process.env.SALT_ROUNDS);
   
        const salt = await bcrypt.genSalt(salt_rounds);
        return await bcrypt.hash(password,salt);
    }
    return "";
    
}

const compare = async(password,hashPassword) =>{
    const result = await bcrypt.compare(password,hashPassword);
    return result;
}

module.exports = { 
    encrypt, compare
 };