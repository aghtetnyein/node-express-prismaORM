const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.send("Api is wrorking 🚀");
});

const roles = require("./roles.routes");
routes.use("/roles", roles);

const users = require("./users.routes");
routes.use("/users", users);

const posts = require("./posts.routes");
routes.use("/posts", posts);

module.exports = routes;
