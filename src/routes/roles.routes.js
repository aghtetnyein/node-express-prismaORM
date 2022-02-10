const roles = require("express").Router();
const roleController = require("../controllers/roles.controller");

// get all roles
roles.get("/", roleController.rolesFetcher);

// get specific role
roles.get("/:roleId", roleController.specificRoleFetcher);

// create new role
roles.post("/", roleController.roleCreator);

// update role
roles.put("/:roleId", roleController.roleUpdater);

// delete role
roles.delete("/:roleId", roleController.roleDestroyer);

module.exports = roles;
