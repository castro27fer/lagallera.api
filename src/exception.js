

const STATUS ={
    OK              : 200,
    CREATE          : 201,
    ACCEPTED        : 202,
    NO_CONTENT      : 204,
    RESET_CONTENT   : 205,
    BAD_REQUEST     : 400,
    UNAUTHORIZED    : 401,
    FORBIDDEN       : 403,
    NOT_FOUND       : 404,
    ERROR           : 500
};

const format = (string,params)=>{
    return string.replace(/{(\d+)}/g, (match, index) => {
        return typeof params[index] !== 'undefined' ? params[index] : match;
      });
}

TYPEERROR = {
    NOT_FOUND:  "NotFound",
    INVALID:    "inValid",
    ERROR:      "Error",
    TOKEN_EXPIRED_ERROR : "TokenExpiredError",
    NOT_AUTORIZED : "Not autorized"
}

MESSAGE_ERROR_DEFAULT = "ocurrio un error inesperado";

MESSAGE = {
    REQUIRED: (field) => format("El campo {0} es obligatorio",[field]),
    IS_EMAIL: (field) => format("Correo no valido.",[field])
}

const err = (code,message,validations)=>{
    return { status : code, message : message, validations };
}

const sequelize_validation_error = (errors)=>{
    
    const validations = errors.map(error => {
        return {
            name:error.path,
            message:error.message
        }
    });

    return validations;
}

const exception = (exception)=>{
   
    console.log(exception);
    if (exception.name === 'SequelizeUniqueConstraintError') {

        return err(STATUS.BAD_REQUEST,"El correo ya esta registrado.",[{name:"email", message:"El correo ya esta registrado."}]);
    
    } else if (exception.name === 'SequelizeValidationError') {
       
        const validations = sequelize_validation_error(exception.errors);
        return err(STATUS.BAD_REQUEST,"debe llenar los campos requeridos",validations);
    
    }
    else if(exception.name == "SequelizeDatabaseError"){

        return err(STATUS.BAD_REQUEST,"La fecha no tiene un formato valido.",[]);
    } 
    else if (exception.name === TYPEERROR.NOT_FOUND){
    
        return err(STATUS.NOT_FOUND,exception.message,[]);
    }
    else if(exception.name === TYPEERROR.INVALID){
      
        return err(STATUS.BAD_REQUEST,exception.message,[]);
    }
    else if(exception.name === TYPEERROR.TOKEN_EXPIRED_ERROR){
      
        return err(STATUS.UNAUTHORIZED,"Sesión Expirada.");
    }
    else if(exception.name === TYPEERROR.NOT_AUTORIZED){
        return err(STATUS.UNAUTHORIZED,"Usted no esta autorizado.");
    }
    else {
        // Manejar otros errores inesperados
           
        return err(STATUS.ERROR,MESSAGE_ERROR_DEFAULT,[]);
    }
}



module.exports = {exception,STATUS,MESSAGE,MESSAGE_ERROR_DEFAULT};