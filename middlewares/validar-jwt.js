const {response, request}= require('express');
const jwt = require('jsonwebtoken');

const validarJWT =(req=request, res=response, next)=>{

    const token = req.header('x-token');

    if(!token){   //si el token no existe hay error
        return res.status(401).json({
            ok:false,
            msg:'No hay token'
        })
    }
    

    try {
        const {_id, name} = jwt.verify(token, process.env.SECRET_JWT_SEED) //VERIFICACION DE TOKEN
        
        req._id=_id;    //aqui se actualiza la req, para enviarla al controller
        req.name= name;
        
    } catch (error) { //SI EL TOKEN NO ES EL DEL USUARIO HAY ERROR
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
    }
    

    next();
}

module.exports={
    validarJWT
}