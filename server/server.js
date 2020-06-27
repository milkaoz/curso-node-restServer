const express = require('express');
const app = express();

const bodyParser = require('body-parser');
require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.json('Hello World!');
});

// Obtener registro de usuario
app.get('/usuario', function(req, res) {
    res.json('Obtener usuario');
});

// Crear un nuevo usuario
app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {
        res.json({
            persona: body
        });
    }

});

// Actualizar data de usuario
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

// Elimina un usuario
app.delete('/usuario', function(req, res) {
    res.json('Usuario eliminado');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto : ', process.env.PORT);
});