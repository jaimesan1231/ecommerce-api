const Producto = require("../Models/Producto");

exports.getProducts = async (req, res) => {
  try {
    const Productos = await Producto.find();
    res.json(Productos);
  } catch (error) {
    console.log("Error : " + error);
  }
};
exports.getProductsCategory = async (req, res) => {
  const category = req.params.category;
  const Productos = await Producto.find({ category: category });
  res.json(Productos);
};
exports.getProductsHigherLess = async (req, res) => {
  const category = req.params.category;
  const Productos = await Producto.find({ category: category }).sort({
    price: -1,
  });
  res.json(Productos);
};
exports.getProductsLessHigher = async (req, res) => {
  const category = req.params.category;
  const Productos = await Producto.find({ category: category }).sort({
    price: 1,
  });
  res.json(Productos);
};
exports.getProductsNameAscend = async (req, res) => {
  const category = req.params.category;
  const Productos = await Producto.find({ category: category }).sort({
    name: 1,
  });
  res.json(Productos);
};
exports.getProductsNameDescend = async (req, res) => {
  const category = req.params.category;
  const Productos = await Producto.find({ category: category }).sort({
    name: -1,
  });
  res.json(Productos);
};

exports.postProducts = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const newProducto = new Producto({ name, price, category });
    console.log(newProducto);
    await newProducto.save();
    res.json("productos");
  } catch (error) {
    res.json(error);
  }
};
