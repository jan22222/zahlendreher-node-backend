const Role = require("../models/role.model.js");
const User = require( "../models/user.model.js");

const getRole = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getRoleByUserId = async (req, res) => {
    try {
        const role = await User.findById(req.userId).role;
        console.log("get Role by user id ", role)
        res.json(role);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {getRoleByUserId, getRole}