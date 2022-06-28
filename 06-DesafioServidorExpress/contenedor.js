// Alumno: Miguel Binstok

const fs = require('fs')

// Crea Clase Contenedor.
class Contenedor {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
    }

    async init() {
        try {
			let data = await fs.promises.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('No hay archivo');
		}
    }

// Metodo para escribir/sobreescrir.
    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ // Aumento el ID.
        object["id"] = this.countID 
        this.content.push(object) //Agrego el objeto al array contenido.
        this.write() // Guardo el objeto en el archivo.
        return `El id del objeto agregado es ${this.countID}` // Devuelve el ID. 
    }

// Devuelve un array con los objetos del archivo.
    getAll() { 
        return this.content
    }

// Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(id) { 
        let result
        if (this.content !== []) {
            let array = this.content
            result = array.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'El archivo está vacío.'
        }
        return result
    }

// Elimina del archivo el objeto con el id buscado.
    deleteById(id) { 
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() // Sobreescribe el archivo.
            result = 'OK'
        } else {
            result = `El archivo está vacío.`
        }
        return result
    }

// Elimina todos los objetos del archivo.
    async deleteAll() { 
        this.content = this.content.splice(0, this.content.length)
        this.write()
    }
}

module.exports = Contenedor