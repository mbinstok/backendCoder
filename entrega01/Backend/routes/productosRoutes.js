const Controller = require('../Controllers/controllerProducts')
const express = require('express');
const routeProducts  = express.Router();

// Middleware de Autenticación
const auth = require('../middleware/auth');

// Rutas de Productos
routeProducts.get('/', auth(true), Controller.getAllProducts);
routeProducts.get('/:id', auth(true), Controller.getProductById);
routeProducts.post('/', auth(true), Controller.newProduct);
routeProducts.put('/:id', auth(true), Controller.updateProductById);
routeProducts.delete('/:id', auth(true), Controller.deleteProduct);

// Módulos exportados
module.exports = routeProducts;