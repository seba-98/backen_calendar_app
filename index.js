const express = require('express');
const { dbConection } = require('./dataBase/config');
require('dotenv').config();
const cors = require('cors');

//creamos el sv de express en nuestra app
const app= express();

//base de datos
dbConection();

//cors
app.use(cors());

// Diretorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json())

//rutas
 app.use('*', express.static('public'));
// app.use('/login', express.static('public'));
app.use('/api/auth', require('./routes/auth' ));
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
  });

//escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`sv corriendo en puerto ${process.env.PORT}`);
});

