module.exports = class ContenedorMongoDB{
    constructor(){
    }

    async guardar(data) {
        const elementoAgregado = await data.save() 
        return elementoAgregado
    }

    async listar(data){
        const elementos = await data.find()
        return elementos
    }

    async listarSublista(data, modelo){
        const elementos = await data.find().populate(modelo)
        return elementos
    }
    
    async mostrarElemento(data, id){
        const elemento = await data.findOne({_id: id})
        return elemento
    }
    
    async actualizar(data){
        await data.save()
        return data
    }

    async eliminar(data, id){
        const elementoEliminado = await data.deleteOne({_id : id})
        return elementoEliminado
    }
}