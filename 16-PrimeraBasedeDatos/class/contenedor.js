// Curso Backend Coderhouse
// Comisión 31015
// Alumno: Miguel Binstok

// Clase Primera Base de Datos

const { options } = require("../config/db.js");
const knex = require("knex")(options);

class Contenedor {
    constructor(name) {
        this.tableName = name;
        this.init();
    }

    async init() {
        await knex.schema.createTableIfNotExists(this.tableName, (table) => {
            table.increments("id");
            table.string("title");
            table.float("price");
            table.string("thumbnail");
        });
    }

    async save(object) {
        try {return await knex(this.tableName).insert([object]);} 
        catch (err) {return `Ocurrio un error al guardar el datos en la DB ${err}`;}
        finally {()=> knex.destroy();}    
    }

    async getById(id) {
        try {return await knex
                .from(this.tableName)
                .select("*")
                .where("id", id)
                .limit(1);} 
        catch (err) {return `Error: ${err}`;}
        finally {()=> knex.destroy();}     
    }

    async getAll() {
        try {return await knex.from(this.tableName).select("*");}
        catch (err) {return `Error: ${err}`;}
        finally {()=> knex.destroy();} 
    }

    async deleteById(id) {
        try {return await knex.from(this.tableName).where("id", id).del();} 
        catch (err) {return `Error: ${err}`;}
        finally {()=> knex.destroy();} 
    }

    async deleteAll() {
        try {return await knex.from(this.tableName).del();} 
        catch (err) {return `Error: ${err}`;}
        finally {()=> knex.destroy();} 
    }
}

module.exports = Contenedor;