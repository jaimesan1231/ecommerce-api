const User = require("../Models/User");
const brypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Role = require("../Models/Role");

exports.singUp = async (req, res) => {
  const { username, email, password, roles } = req.body;
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  const foundRoles = await Role.find({ name: { $in: roles } });
  newUser.roles = foundRoles.map((role) => role.id);

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.json(token);
};

exports.singIn = async (req, res) => {
  const userFound = await User.findOne({
    email: req.body.email,
  }).populate("roles");
  if (!userFound) {
    return res.status(400).json({ message: "Usuario no existe" });
  }
  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword) {
    return res
      .status(401)
      .json({ token: null, message: "Contraseña invalida" });
  }
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });
  console.log(userFound);
  res.json({ token, userFound });
};
