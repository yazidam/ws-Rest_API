const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const createUser = async (req, res) => {
  const user = new User(req.body);
  const { email } = req.body;
  const { password } = req.body;
  //   const email1 = req.body.email;
  const existe = await User.findOne({ email });
  if (existe) {
    return res.status(400).json("user with this email already existe");
  }
  const hashedPsw = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: hashedPsw,
  });
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

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    Object.assign(user, req.body);
    await user.save();
    res.send({ data: user });
  } catch (error) {
    res.status(404).send({ error: "user not found try again" });
  }
};

const authUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
      console.log("loginnn");
    } else {
      res.status(401);
      throw new Error("invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  authUser,
};
