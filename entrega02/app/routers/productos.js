const productoController = require('../controllers/productos')
const { Router } = require('express')

const route = Router()

route.post('/', productoController.guardarProducto)
route.get('/', productoController.mostrarProductos)
route.get('/:id', productoController.mostrarProducto)
route.put('/:id', productoController.actualizarProducto)
route.delete('/:id', productoController.eliminarProducto)


module.exports = route