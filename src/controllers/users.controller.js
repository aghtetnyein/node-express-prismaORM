const { PrismaClient } = require("@prisma/client");
const { user, role } = new PrismaClient();

// get all users
const usersFetcher = async (req, res) => {
  const users = await user.findMany();

  if (!users) {
    res.status(404).json({
      message: "Users not found",
    });
  }

  res.status(200).json({
    message: "Users fetched successfully",
    data: users,
  });
};

// get specific user
const specificUserFetcher = async (req, res) => {
  const specificUser = await user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!specificUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User found",
    data: specificUser,
  });
};

// create new user
const userCreator = async (req, res) => {
  const { email, name, roleId } = req.body;

  const roleExists = await role.findUnique({
    where: {
      id: roleId,
    },
  });

  if (!roleExists) {
    return res.status(404).json({
      message: "Role not found",
    });
  }

  const userExists = await user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  let newUser = await user.create({
    data: {
      email,
      name,
      roleId,
    },
  });

  res.status(201).json({
    message: "User created successfully",
    data: newUser,
  });
};

// update user
const userUpdater = async (req, res) => {
  const { email, name, roleId } = req.body;

  const roleExists = await role.findUnique({
    where: {
      id: roleId,
    },
  });

  if (!roleExists) {
    return res.status(404).json({
      message: "Role not found",
    });
  }

  const currentUser = await user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  });

  const userExists = await user.findUnique({
    where: {
      email,
    },
  });

  if (userExists && currentUser.email !== email) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const updatedUser = await user.update({
    where: {
      id: Number(req.params.userId),
    },
    data: {
      email,
      name,
      roleId,
    },
  });

  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
  });
};

// delete user
const userDestroyer = async (req, res) => {
  const specificUser = await user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  });

  if (!specificUser) {
    res.status(404).json({
      message: "User not found",
    });
  }

  const deletedUser = await user.delete({
    where: {
      id: Number(req.params.userId),
    },
  });

  res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser,
  });
};

const userController = {
  usersFetcher,
  specificUserFetcher,
  userCreator,
  userUpdater,
  userDestroyer,
};

module.exports = userController;
