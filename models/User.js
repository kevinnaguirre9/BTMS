const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
     nombres: {
          type: String,
          required: true
     },
     apellidos: {
          type: String,
          required: true
     },
     cedula: {
          type: String,
          required: true,
          unique: true 
     },
     fechaNacimiento: {
          type: Date,
          required: true
     },
     direccion: {
          type: String,
          required: true
     },
     sexo: {
          type: String,
          required: true
     },
     celular: {
          type: String,
          required: true,
          unique: true
     },
     imgKey: {
          type: String,
          required: true,
          unique: true 
     },
     activo: {
          type: Boolean,
          required: true
     },
     rol: {
          type: Schema.Types.ObjectId,
          ref: "roles" 
     }
}, {
     timestamps: true,
     versionKey: false
})

module.exports = mongoose.model('users', userSchema);