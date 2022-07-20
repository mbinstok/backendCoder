// Curso Backend Coderhouse
// Comisión 31015
// Alumno: Miguel Binstok

// Clase Contenedor

const fs = require('fs')
class Contenedor {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
        this.init()
    }

    async init() {
        try {
			let data = await fs.promises.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('Aún no hay archivo');
		}
    }
// Método que escribe al archivo.
    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ // Guardo el ID incrementado.
        object["id"] = this.countID // Agrego la propiedad id al objeto.
        this.content.push(object) // Agrego el objeto al array.
        this.write() // Grabo al archivo.
        return `El id del objeto agregado es ${this.countID}.` //Retorna el id.
    }
// Devuelve un array con los objetos del archivo.
    getAll() { 
        return this.content
    }

// Recibe un id y devuelve el objeto con ese id.
    getById(id) { 
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'El archivo está vacío'
        }
        return result
    }

// Elimina del archivo el objeto por el id
    deleteById(id) { 
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() // Escribo el archivo.
            result = `Producto eliminado`
        } else {
            result = `Archivo vacío`
        }
        return result
    }

// Elimina todos los objetos del archivo.
    async deleteAll() { 
        this.content = await this.content.splice(0, this.content.length)
        this.write()
    }

// Actualiza el objeto por id     
    update(id, obj){
        const index = this.content.findIndex( objectT => objectT.id == id);
        obj.id = this[index].id
        this.content[index] = obj;
        return obj;
    }
}

module.exports = Contenedor