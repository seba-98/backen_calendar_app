const {response, request}= require('express');
const jwt = require('jsonwebtoken');

const validarJWT =(req=request, res=response, next)=>{

    const token = req.header('x-token');

    if(!token){   //si el token no existe hay error
        return res.status(401).json({
            ok:false,
            msg:'Su sesión expiro, vuelva a iniciar sesión.'
        })
    }
    

    try {
        const {_id, name} = jwt.verify(token, process.env.SECRET_JWT_SEED) //VERIFICACION DE TOKEN
        
        req._id=_id;    //aqui se actualiza la req,
        req.name= name;

        //el token se actualiza implicitamente en el req, para enviarlo al controller.
        
    } catch (error) { //SI EL TOKEN NO ES EL DEL USUARIO HAY ERROR
        return res.status(401).json({
            ok:false,
            msg:'Token no valido, vuelva iniciar sesión.'
        })
    }

    next();
}

module.exports={
    validarJWT
}