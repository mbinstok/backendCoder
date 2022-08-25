require('dotenv').config()
const productoDAO = require('../daos/'+process.env.AMBIENTE+'/ProductosDAO')


class ProductosController{

    async guardarProducto(req, res) {
        const productoAgregado = await productoDAO.guardarProducto(req.body)
        res.send(productoAgregado)
    }

    async mostrarProductos(req, res){
        const productos = await productoDAO.listarProductos()
        res.send(productos)
    }
    
    async mostrarProducto(req, res){
        const producto = await productoDAO.mostrarProducto(req.params.id)
        res.send(producto)
    }
    
    async actualizarProducto(req, res){
        const producto = await productoDAO.actualizarProducto(req.body, req.params.id)
        res.send(producto)
    }

    async eliminarProducto(req, res){
        const producto = await productoDAO.eliminarProducto(req.params.id)
        res.send(producto)
    }
}

module.exports = new ProductosController()