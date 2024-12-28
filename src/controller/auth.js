const logIn = async(req,res)=>{

    res.status(200).json({messagje:"Sessión Iniciada."});
}

const logOut = async(req,res)=>{

}

const resetPassword = async(req,res)=>{

}

module.exports = {
    logIn, logOut, resetPassword
}