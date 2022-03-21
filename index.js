const express = require('express');
const { dbConection } = require('./dataBase/config');
require('dotenv').config();
const cors = require('cors');


//base de datos
dbConection();

//creamos el sv de express en nuestra app
const app= express();

app.use(cors());
app.use(express.json())

//rutas
app.use('/api/auth', require('./routes/auth' ));
app.use('/api/events', require('./routes/events'));


 app.use(express.static('public'));

//escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`sv corriendo en puerto ${process.env.PORT}`);
});

