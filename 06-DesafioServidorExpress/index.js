// Desafío: Servidor con Express
// Curso Codehouse Backend 31015
// Alumno: Miguel Binstok

const express = require("express");
const fs = require("fs");
const Contenedor = require("./contenedor.js");
const app = express();
const PORT = 8080;

// Instancia la Clase Contenedor
const Productos = new Contenedor("productos.txt");
Productos.init();

// Escucha en PORT
app.listen(PORT);

// Logea Errores
app.on("error", (error) => {
    console.log("Se ha detectado un error.");
});

// Respuesta si se conectan a la raiz
app.get("/", (request, response) => {
    response.send(`<h1 style='color:blue;'>Bienvenidos al Servidor con Express</h1>`);
});

// Responde un array con todos los productos 
app.get("/productos", (request, response) => {
    response.send(Productos.getAll());
});

// Responde con un producto al azar
app.get("/productoRandom", (request, response) => {
    response.send(Productos.getById(Math.floor(Math.random() * (Productos.countID - 1 + 1) + 1)));
});