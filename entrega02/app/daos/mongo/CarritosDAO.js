const ContenedorMongoDB = require('../../contenedor/ContenedorMongoDB')
const Producto = require('../../models/productos')
const Carrito = require('../../models/carritos')

class CarritosDAO extends ContenedorMongoDB{
    constructor(){
        super()
    }

    async agregarCarrito(){
        const carrito = new Carrito({
            fecha: Date().toString()
        })
        const carritoGuardado = await super.guardar(carrito)
        return carritoGuardado
    }


    async traerCarritos () {
        const carritos = await super.listarSublista(Carrito, 'productos')
        return carritos
    }


    async agregarProductoACarrito(idProducto, idCarrito){
        const carrito = await super.mostrarElemento(Carrito, idCarrito)
        carrito.productos.push(idProducto)
        await super.actualizar(carrito)
        console.log(carrito)
        return carrito
    }


    async eliminarProductoCarrito(idCarrito, idProducto){
        const carrito = await super.mostrarElemento(Carrito, idCarrito)
        carrito.productos = carrito.productos.filter(prod => prod != idProducto)
        await super.actualizar(carrito)
        return carrito
    }


    async eliminarCarrito(id){
        const eliminarCarrito = await super.eliminar(Carrito, id)
        return eliminarCarrito
    }
}

module.exports = new CarritosDAO()