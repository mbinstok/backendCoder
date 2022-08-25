const ContenedorArchivos = require('../../contenedor/ContenedorArchivos')

class ProductosDAO extends ContenedorArchivos{
    constructor(){
        super('./__temporal__/productos.txt')
    }

    async listarProductos(){
        try{
            const lista = await super.leer()
            return lista
        }catch(e){
            throw new Error(e.message)
        }
    }

    async guardarProducto(data){
        try{
            await super.guardar(data)
            return data
        } catch(e){
            throw new Error(e.message)
        }
    }
}

module.exports = new ProductosDAO()