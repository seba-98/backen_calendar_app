const mongoose=require('mongoose');

const dbConection = async()=>{

    try {
      await mongoose.connect(process.env.DB_CNN);
        
      console.log("DB ONLINE");  
        
    } catch (error) {
        console.log("Error al iniciar base de datos: \n"+error);
    }
}

module.exports={
    dbConection
}