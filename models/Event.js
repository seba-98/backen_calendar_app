const{Schema, model}=require('mongoose');

const EventSchema=Schema({

    title:{
        type:String,
        required:true
    },
    notes:{
        types:String,
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
});

{/*Ejemplo de serialización del esquema-

  EventSchema.method('toJson', function(){
        const {_v, _id, ...object}= this.toObject();
        object.id = _id

        return object
  })

  de esta forma quitamos _v y reemplazamos el _id por id
*/}

module.exports=model('Event', EventSchema);