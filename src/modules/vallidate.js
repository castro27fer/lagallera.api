const MAXLENGTH = (param) => { 
   
    return {
        valid: param.value.length <= param.max,
        message:`Maximo ${param.max} caracteres`
    }
}

const REQUIRED = (param) => {
    return { 
        valid: param.value !== null && param.value !== undefined  && param.value.trim() !== "", 
        message:"Campo vacío."
    };
};

const DATE_FORMAT = (param) => {
    return {
        valid : param.regex.test(param.value),
        message:"Formato de fecha no valido"
    }
}

const DATA_VALID = (param) => {

    // console.log(param,isNaN(new Date(param.value).getTime()))
    return { 
        valid:!isNaN(new Date(param.value).getTime()),
        message:"Fecha no valida"
    }
}



const NUMBERPHONE_VALID = (param) =>{
    const regex = /^[0-9]\d*$/;
    const regex2 = /^\+([1-9]\d*)$/;
    return {
        valid: regex.test(param.value) || regex2.test(param.value),
        message:"Número teléfonico no valido"
    }
}

async function ID_ISVALID(param){
    const exist = true//await connection_cedij.query(param.query, { type: QueryTypes.SELECT });
    return {
        valid: exist.length > 0,
        message:"Código no existe"
    }
}

const validate_rules = (param,rules)=>{

    let validate = { name: "", valid : true, message:"" };

    const validate_rules_collection = (param,rules) => {

        rules.forEach(rule => {
            validate = rule(param);
            if(!validate.valid) return; //value is false
        });

        return validate
    }

    const requiredRule = validate_rules_collection(param,[REQUIRED]);

    if((requiredRule.valid && param.required) || (requiredRule.valid && param.required === null)){
        validate = validate_rules_collection(param,rules);
    }
    else if(!requiredRule.valid && param.required === null){
        validate.message = "";
        validate.valid = true;
    }
    else if(!param.required){ 
        validate = requiredRule; 
    }
    validate.name = param.name;
    return validate;
}

const validate_Now = (rules) =>{

    const valid = rules.filter(x=>x.valid === false).length === 0;
    const validations = rules.filter(x=>x.valid === false)
    .map(valid =>{ 
        return { 
            name:valid.name,
            message:valid.message 
        }
    });

    return {
        valid       :   valid,
        validations :   validations
    };

}

module.exports = {
    MAXLENGTH,
    REQUIRED,
    DATE_FORMAT,
    DATA_VALID,
    NUMBERPHONE_VALID,
    ID_ISVALID,
    validate_rules,
    validate_Now,

}