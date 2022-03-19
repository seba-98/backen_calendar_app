const { response } = require("express")
const Event = require("../models/Event")



const getEvents=async(req, res=response)=>{

    try {
        
        const events = await Event.find().populate('user', 'name') //como la propiedad user, es de tipo Schema.Types.ObjectId,
                                                                    //podemos obtener los datos del usuario especificados
        return res.status(200).json({                               //en el segundo parametro de tipo string
            ok:true,
            events: events
        })
        
    } catch (error) {
        console.log(`Error al buscar eventos: \n ${error}`);
        res.status(500).json({
            ok:false,
            msg:'Error al buscar eventos'
        })
    }

    
}

const createEvent= async(req, res=response)=>{


    const event= new Event(req.body);

    event.user=req._id //el id del usuario activo se puede obtener ya que el token fue cargado en las rutas

    try {
        await event.save();
        return res.status(200).json({
            ok:true,
            event:{...event, }
        })
    } catch (error) {
        console.log(`Error al crear: \n ${error}`);
        return res.status(500).json({
            ok:false,
            msg:'Error fatal'
        })
    }
    
   
}
const updateEvent=async(req, res=response)=>{
    const id = req.params.id;
    
    try {

        let event;

        try {
            event= await Event.findById(id);
            
        } catch (error) {
            return res.status(404).json({
                ok:false,
                msg:'El evento no existe'
            })
        }

        
        if(event.user.toString() !== req._id){
            return res.status(401).json({
                ok:false,
                msg:'No tiene permisos para borrar este evento'
            })
        }


        const newEvent={...req.body, user: req._id}
        const updatedEvent=await Event.findByIdAndUpdate(id, newEvent, {new:true});
        
        res.status(200).json({
            ok:true,
            newEvent
        })


    } catch (error) {
        console.log(`Error al actualizar: \n ${error}`);
        return res.status(500).json({
            ok:false,
            msg:'Error fatal'
        })
    }

}


const deleteEvent=async(req, res=response)=>{

    const id = req.params.id;
    const userId= req._id;
    
    try {

        let event;

        try {
            event = await Event.findById(id);
            
        } catch (error) {
            return res.status(500).json({
                ok:false,
                msg:'No existe el evento'
            })
        }



        if(event.user.toString() !== userId){
            return res.status(401).json({
                ok:false,
                msg:'No tiene permisos para borrar este evento'
            })
        }

        const eventDeleted=await Event.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            msg:'Evento eliminado',
            event: eventDeleted
        })

        
    } catch (error) {
        console.log(`Error al eliminar: \n ${error}`);
        return res.status(500).json({
            ok:false,
            msg:'error fatal'
        })
    }
    
    return res.json({
        ok:true,
        msg:'delete'
    })
}



module.exports={
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents
}