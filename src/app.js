const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./db.conexion");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const { createRoles } = require("./libs/initialSetup");

const routerProductos = require("./routes/productos.routes");
const routerAuth = require("./routes/auth.routes");
const fileUpload = require("express-fileupload");

//DB Connection
dbConnection();

//Settings
createRoles();
app.set("port", process.env.PORT || 3500);

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-3748397023889743-082020-32ae95598062d08ac01d860b4de9332c-811066440",
});

//Routes
app.post("/checkout", (req, res) => {
  let preference = {
    items: [
      {
        title: "Mi producto",
        unit_price: 100,
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
      console.log(req.body);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.use("/api/productos", routerProductos);
app.use("/api/auth", routerAuth);

module.exports = app;
