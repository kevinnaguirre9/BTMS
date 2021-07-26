const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    nombre: String
}, {
     timestamps: true,
     versionKey: false
})


const Role = mongoose.model('roles', roleSchema);
module.exports = Role;