const express = require('express');
const { dbConection } = require('./dataBase/config');
require('dotenv').config();
const cors = require('cors');


//base de datos
dbConection();

//creamos el sv de express en nuestra app
const app= express();

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

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

