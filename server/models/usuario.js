const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('../routes/usuario');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        unique: true,
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Sobreescribimos el metodo JSON que se ocupa en la 
// respuestas de los metodos put, get, post, delete 
usuarioSchema.methods.toJSON = function() {

    // asigna el nuevo usuario (this) creado a un 'user'
    let user = this;

    // hereda todas las propiedades y metodos
    let userObject = user.toObject();
    // Borra del objeto creado la password
    delete userObject.password;

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('usuario', usuarioSchema);