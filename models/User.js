const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
     nombres: String,
     apellidos: String,
     fechaNacimiento: Date,
     direccion: String,
     sexo: String,
     celular: String,
     imgUrl: String,
     estatus: String,
     rol: {
          type: Schema.Types.ObjectId,
          ref: "roles" 
     }
}, {
     timestamps: true,
     versionKey: false
})

const User = mongoose.model('users', userSchema);
module.exports = User;