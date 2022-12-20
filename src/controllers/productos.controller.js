const Producto = require("../Models/Producto");
const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update({
  credentials: {
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_secret_access_key,
  },
});
const spacesEndpoint = new AWS.Endpoint(config.Endpoint);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});

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
  res.connection.destroy();
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
    const imagen = req.files.variable;
    await s3
      .putObject({
        Body: imagen.data,
        ACL: "public-read",
        Bucket: config.BucketName,
        Key: imagen.name,
      })
      .promise();
    const urlImage =
      "https://" +
      config.BucketName +
      "." +
      config.Endpoint +
      "/" +
      imagen.name;
    const newProducto = new Producto({ name, price, category });
    newProducto.url = urlImage;
    await newProducto.save();
    res.json(newProducto);
  } catch (error) {
    res.json(error);
  }
};
