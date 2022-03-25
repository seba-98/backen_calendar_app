const {response}= require('express');
const {validationResult}= require('express-validator');



const validateFields = (req, res=response, next)=>{

    const errors=validationResult(req) //obtenemos el error del validator por medio de la request
    const arrTxt=errors.array().map(error=>error.msg); //obtenemos el array de errores

    !errors.isEmpty() ? res.status(400).json({
        ok:false,
        msg:arrTxt.join('.\n').toString() //convertimos el array de errores en un string con un 
    })                                    //salto de linea entre cada error y lo enviamos como respuesta
    :
    next();

};


module.exports={
    validateFields
}