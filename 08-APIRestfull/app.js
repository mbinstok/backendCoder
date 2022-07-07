// Curso Backend Coderhouse
// Comisión 31015
// Alumno: Miguel Binstok


const express = require("express");
const Contenedor = require("./class/contenedor");
const { Router } = express;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const router = Router();
// Instancia la clase Contenedor.
const productos = new Contenedor(__dirname + "/data/productos.json");

// Definde la ruta
app.use("/api/productos", router);
app.use(express.static("./views"));
// Escuchamos en el Puero 8080.
app.listen(8080);

// Devuelve todos los productos.
router.get("/", (req, res) => {
    return res.json(productos.content);
  });
  
// Devuelve un producto por id.
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    return res.json(productos.getById(id));
  });

// Postea un Producto y asigna su id.  
router.post("/", (req, res) => {
    let obj = req.body;
    return res.json(productos.save(obj));
  });

// Actualiza un producto según su id.  
router.put("/:id", (req, res) => {
    let obj = req.body;
    let id = Number(req.params.id);
    return res.json(productos.update(id, obj));
  });
  
// Elimina un producto segun su id.  
  router.delete("/:id", (req, res) => {
    let id = Number(req.params.id);
    return res.json(productos.deleteById(id));
  });