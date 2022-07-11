// Curso Backend Coderhouse
// Comisión 31015
// Alumno: Miguel Binstok
// Motores de Plantillas

const express = require("express");
const Contenedor = require("./class/contenedor");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

const productos = new Contenedor(__dirname + "/data/productos.json");

// Usamos Plantilla Pug
app.set('views', './views/pug')
app.set('views engine', 'pug')

app.get('/', (req, res) => {
    let content = productos.content
    return res.render('index.pug', {content})
})

app.post("/productos", (req, res) => {
    productos.save(req.body)
    let content = productos.content
    return res.render('productos.pug', {content});
});

app.get("/productos", (req, res) => {
    let content = productos.content
    return res.render('productos.pug', {content});
});

app.listen(8080);