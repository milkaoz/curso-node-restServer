const express = require('express');
const app = express();
const mongoose = require('mongoose');

const usuario = require('./routes/usuario');

const bodyParser = require('body-parser');
require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(usuario);


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Conectado a base de datos');
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto : ', process.env.PORT);
});