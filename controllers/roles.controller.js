const Role = require('../models/Role');


const createRole = async (req, res) => {
     const newRole = new Role({nombre: req.body.nombre});

     const roleSaved = await newRole.save();

     res.status(201).json(roleSaved);
}

const getRoles = async (req, res) => {
     const roles = await Role.find();
     res.json(roles);
}

const getRoleById = (req, res) => {
     
}

const updateRoleById = (req, res) => {
     
}

const deleteRoleById = (req, res) => {
     
}

module.exports = {
     createRole,
     getRoles,
     getRoleById,
     updateRoleById,
     deleteRoleById
}