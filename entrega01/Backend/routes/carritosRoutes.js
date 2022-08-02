const Controller = require('../Controllers/controllerCarrito');
const express = require('express');
const routeCart  = express.Router();
const auth = require('../middleware/auth');

// Rutas del Carrito
routeCart.post('/', auth(true), Controller.createCart);
routeCart.delete('/:id', auth(true), Controller.deleteCart);
routeCart.delete('/:id/productos/:idProduct', auth(true), Controller.deleteProductOnCart);
routeCart.post('/:id/productos/:productId', auth(true), Controller.addProductOnCart);
routeCart.get('/:id/productos', auth(true), Controller.getCartProducts);

// Módulos exportados
module.exports = routeCart