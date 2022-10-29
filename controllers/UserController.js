const User = require("../models/User");

const createUser = async (req, res) => {
  const user = new User(req.body);
  const { email } = req.body;
  //   const email1 = req.body.email;
  const existe = await User.findOne({ email });
  if (existe) {
    return res.status(400).json("user with this emailamready existe");
  }
  const newUser = await user.save();
  return res.status(201).json(newUser);
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    return res.status(400).json("user not found");
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json("user removed");
  } else {
    return res.status(400).json("user not found");
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};
