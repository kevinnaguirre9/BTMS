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

const getRoleById = async (req, res) => {
     const role = await Role.findById(req.params.roleId);
     res.status(200).json(role);
}

const updateRoleById = async (req, res) => {
     const updatedRole = await Role.findByIdAndUpdate(req.params.roleId, req.body, {
          new: true
     });
     res.status(200).json(updatedRole); //podría ser 204 pero como quiero imprimir el nuevo registro lo dejo en 200
}

const deleteRoleById = async (req, res) => {
     const {roleId} = req.params;
     await Role.findByIdAndDelete(roleId);
     res.status(204).json();
}

module.exports = {
     createRole,
     getRoles,
     getRoleById,
     updateRoleById,
     deleteRoleById
}