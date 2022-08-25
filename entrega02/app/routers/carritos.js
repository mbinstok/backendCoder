const carritoController = require('../controllers/carritos')
const { Router } = require('express')

const route = Router()

route.get('/', carritoController.traerCarritos)
route.post('/', carritoController.agregarCarrito)
route.post('/:idCarrito/producto/:id', carritoController.agregarProductoACarrito)
route.delete('/:idCarrito/producto/:id', carritoController.eliminarProductoCarrito)
route.delete('/:id', carritoController.eliminarCarrito)


module.exports = route