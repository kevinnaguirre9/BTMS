const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const userSchema = new Schema({
     nombres: String,
     apellidos: String,
     fechaNacimiento: Date,
     direccion: String,
     sexo: String,
     celular: String,
     imgUrl: String,
     estatus: String,
}, {
     timestamps: true,
     versionKey: false
})

module.exports = userSchema;