const {response}= require('express');
const User_model = require('../models/User_model');
const bcryp= require('bcryptjs');
const { generateJWT } = require('./helpers/JWT');

const register =  async (req, res = response)=>{ 

    const {email, password}=req.body;
    
    try {
        
        let user=await User_model.findOne({email});

        if(user){  //si user ya existe mandamos el error
           return res.status(400).json({
                ok:false,
                msg:'El email ya esta registrado'
            })
        }

        user = new User_model(req.body);  //si user no existe, armamos el modelo con los datos del req


        //-----------encryptar contraseña---------

        const salt = bcryp.genSaltSync();
        user.password = bcryp.hashSync(password, salt)

        //-------------------------------------------


        await user.save(); //no hay error, guardamos al nuevo usuario

        const token = await generateJWT(user._id, user.name);

        res.status(201).json({ //respuesta success
            ok:true,
            _id:user._id,
            name:user.name,
            email:user.email,
            token
        })
        
         
    } catch (error) { //error de sistema :(
        console.log("Error al crear usuario:\n"+ error);
        res.status(500).json({
            ok:false,
            msg:"Error al registrarse(Estamos trabajando en ello..)  "
        })
    }
}


const login= async (req, res = response)=>{
    const{email, password} = req.body;

    try {

        let user = await User_model.findOne({email});

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:'Email o contraseña incorrectos'
            })
        }



        //---------confirmar contraseñas--------

        const validPassword= bcryp.compareSync(password, user.password);

        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg:'Email o contraseña incorrectos'
            })
        }
        //----------------------------

        
        const token = await generateJWT(user._id, user.name);
        
        res.status(201).json({
            ok:true,
            _id:user._id,
            name:user.name,
            email:user.email,
            token
        })
        
    } catch (error) {
        console.log("Error al crear usuario:\n"+ error);
        res.status(500).json({
            ok:false,
            msg:"Error al autenticarse(Estamos trabajando en ello..) "
        })
    }
}

const renew = async (req, res = response)=>{

    const {_id, name} = req;
    const token = await generateJWT(_id, name);

    res.json({
        ok:true,
        token,
        _id,
        name
    })
}


module.exports= {
    register,
    login,
    renew
}