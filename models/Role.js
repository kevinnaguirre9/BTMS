const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    nombre: {
        type: String,
        unique: true 
   }
}, {
     timestamps: true,
     versionKey: false
})


module.exports = mongoose.model('roles', roleSchema);