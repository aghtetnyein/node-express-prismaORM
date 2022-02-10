const { PrismaClient } = require("@prisma/client");

const { role } = new PrismaClient();

// get all roles
const rolesFetcher = async (req, res) => {
  const roles = await role.findMany();

  if (!roles) {
    res.status(404).json({
      message: "Roles not found",
    });
  }

  res.json({
    message: "Roles fetched successfully",
    data: roles,
  });
};

// get specific role
const specificRoleFetcher = async (req, res) => {
  const specificRole = await role.findUnique({
    where: {
      id: Number(req.params.roleId),
    },
    select: {
      id: true,
      name: true,
      users: true,
    },
  });

  if (!specificRole) {
    return res.status(404).json({
      message: "Role not found",
    });
  }

  res.status(200).json({
    message: "Role found",
    data: specificRole,
  });
};

// create new role
const roleCreator = async (req, res) => {
  const { name } = req.body;

  const roleExists = await role.findUnique({
    where: {
      name,
    },
  });

  if (roleExists) {
    return res.status(400).json({
      message: "Role already exists",
    });
  }

  let newRole = await role.create({
    data: {
      name,
    },
  });

  res.status(201).json({
    message: "Role created successfully",
    data: newRole,
  });
};

// update role
const roleUpdater = async (req, res) => {
  const { name } = req.body;

  const roleExists = await role.findUnique({
    where: {
      name,
    },
  });

  if (roleExists) {
    res.status(400).json({
      message: "Role already exists",
    });
  }

  let updatedRole = await role.update({
    where: {
      id: Number(req.params.roleId),
    },
    data: {
      name,
    },
  });

  res.status(200).json({
    message: "Role updated",
    data: updatedRole,
  });
};

// delete role
const roleDestroyer = async (req, res) => {
  const specificRole = await role.findUnique({
    where: {
      id: Number(req.params.roleId),
    },
  });

  if (!specificRole) {
    res.status(404).json({
      message: "Role not found",
    });
  }

  const deletedRole = await role.delete({
    where: {
      id: Number(req.params.roleId),
    },
  });

  res.status(200).json({
    message: "Role deleted",
    data: deletedRole,
  });
};

const roleController = {
  rolesFetcher,
  specificRoleFetcher,
  roleCreator,
  roleUpdater,
  roleDestroyer,
};

module.exports = roleController;
