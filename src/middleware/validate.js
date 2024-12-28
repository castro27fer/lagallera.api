const { MAXLENGTH, validate_rules, validate_Now } = require("../modules/vallidate")
const {STATUS,MESSAGE} = require("../exception.js");

const logIn = async(req, res,next) =>{

    const { email, password } = req.body;

    let rules = [
        validate_rules({ name:"email", value:email, required:true, max:255 },[MAXLENGTH]),
        validate_rules({ name:"password", value:password, required:true, max:255 },[MAXLENGTH])
    ]

    const { valid, validations } = validate_Now(rules);

    if(!valid){
        res.status(STATUS.BAD_REQUEST)
        .json({ 
            "status"    :   STATUS.BAD_REQUEST,
            "message"   :   "Existen campos incompletos",
            validations :   validations
        }); 

        return;
    }

    next();
};

module.exports = {
    logIn
}