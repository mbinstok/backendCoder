require('dotenv').config()
const carritoDAO = require('../daos/'+process.env.AMBIENTE+'/CarritosDAO')

class CarritosController{

    async traerCarritos (req, res) {
        const carritos = await carritoDAO.traerCarritos()
        res.send(carritos)
    }

    async agregarCarrito(req, res){
        const carritoGuardado = await carritoDAO.agregarCarrito()
        res.status(201).send(carritoGuardado)
    }

    async agregarProductoACarrito(req, res){
        const carrito = await carritoDAO.agregarProductoACarrito(req.params.id, req.params.idCarrito)
        res.send(carrito)
    }

    async eliminarProductoCarrito(req, res){
        const carrito = await carritoDAO.eliminarProductoCarrito(req.params.idCarrito, req.params.id)
        res.send(carrito)
    }

    async eliminarCarrito(req, res){
        const eliminarCarrito = await carritoDAO.eliminarCarrito(req.params.id)
        res.send(eliminarCarrito)
    }

}

module.exports = new CarritosController()