const ContenedorMongoDB = require('../../contenedor/ContenedorMongoDB')
const Producto = require('../../models/productos')

class ProductosDAO extends ContenedorMongoDB{
    constructor(){
        super()
    }

    async guardarProducto(data) {

        const producto1 = new Producto({
            title: data.title,
            price: data.price,
            url: data.url,
            date: Date().toString()
        })
        const productoAgregado = await super.guardar(producto1) 
        return productoAgregado
    }

    async listarProductos(){
        const productos = await super.listar(Producto)
        return productos
    }
    
    async mostrarProducto(id){
        const producto = await super.mostrarElemento(Producto, id)
        return producto
    }
    
    async actualizarProducto(data, id){
        const producto = await super.mostrarElemento(Producto, id)
        producto.title = data.title
        producto.price = data.price
        producto.url = data.url
        await super.actualizar(producto)

        return producto
    }

    async eliminarProducto(id){
        const eliminarProd = await super.eliminar(Producto, id)
        return eliminarProd
    }
}

module.exports = new ProductosDAO()