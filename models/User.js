const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
     nombres: String,
     apellidos: String,
     cedula: {
          type: String,
          unique: true 
     },
     fechaNacimiento: Date,
     direccion: String,
     sexo: String,
     celular: String,
     imgUrl: String,
     activo: Boolean,
     rol: {
          type: Schema.Types.ObjectId,
          ref: "roles" 
     }
}, {
     timestamps: true,
     versionKey: false
})

module.exports = mongoose.model('users', userSchema);