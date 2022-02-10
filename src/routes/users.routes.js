const users = require("express").Router();
const userController = require("../controllers/users.controller");
const { PrismaClient } = require("@prisma/client");

const { user, role } = new PrismaClient();

// get all users
users.get("/", userController.usersFetcher);

// get specific user
users.get("/:userId", userController.specificUserFetcher);

// create new user
users.post("/", userController.userCreator);

// update specific user
users.put("/:userId", userController.userUpdater);

// delete user
users.delete("/:userId", userController.userDestroyer);

module.exports = users;
