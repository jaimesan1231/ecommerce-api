const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../Models/User");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "No hay token" });
    }
    const decoded = jwt.verify(token, config.SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "No existe usuario" });
    }
    console.log(user);
    next();
  } catch (error) {
    res.status(401).json({ message: "No autorizado" });
  }
};
