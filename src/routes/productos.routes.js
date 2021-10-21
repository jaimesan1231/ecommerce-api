const { Router } = require("express");
const { verifyToken } = require("../middlewares/authJwt");
const ctrProductos = require("../controllers/productos.controller");
const routerProductos = Router();

routerProductos.get("/", ctrProductos.getProducts);
routerProductos.get("/:category", ctrProductos.getProductsCategory);
routerProductos.get(
  "/HigherLess/:category",
  ctrProductos.getProductsHigherLess
);
routerProductos.get(
  "/LessHigher/:category",
  ctrProductos.getProductsLessHigher
);
routerProductos.get(
  "/NameAscend/:category",
  ctrProductos.getProductsNameAscend
);
routerProductos.get(
  "/NameDescend/:category",
  ctrProductos.getProductsNameDescend
);

routerProductos.post("/", verifyToken, ctrProductos.postProducts);

module.exports = routerProductos;
