const express = require('express');
const bcrypt = require('bcrypt');
// https://underscorejs.org/
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

app.get('/', function(req, res) {
    res.json('Hello World!');
});

// Obtener registro de usuario
app.get('/usuario', verificaToken, function(req, res) {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err1, conteo) => {
                return res.status(200).json({
                    ok: true,
                    cantidad: conteo,
                    usuarios
                });
            });
        });

});

// Crear un nuevo usuario
app.post('/usuario', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

// Actualizar datos de usuario
app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let _id = req.params.id;

    //Devuelve una copia del objeto, filtrada para que solo tenga valores en la lista de valores 
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // id: Corresponde al id del usuario
    // body: Viene del request

    // De forma predeterminada, findByIdAndUpdate () devuelve el documento tal como estaba antes 
    // de que se aplicara la actualización. Si establece new: true, findOneAndUpdate () en su lugar 
    // le dará el objeto después de aplicar la actualización

    // runValidators: si es verdadero, ejecuta los validadores que definimos en el modelo

    Usuario.findByIdAndUpdate(_id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

// Elimina un usuario
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let cambiaEstado = {
        estado: false

    };

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            console.log('Usuario no encontrado');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });





});

module.exports = app;