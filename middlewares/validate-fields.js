const {response}= require('express');
const {validationResult}= require('express-validator');



const validateFields = (req, res=response, next)=>{

    const errors=validationResult(req) //obtenemos el error del validator por medio de la request

    !errors.isEmpty() ? res.status(400).json({
        ok:false,
        errors:errors.mapped()
    })  
    :
    next();

};


module.exports={
    validateFields
}