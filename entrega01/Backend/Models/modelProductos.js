const { addProductOnCart } = require("../Controllers/controllerCarrito");
const moment = require("moment");
const fs = require("fs").promises;

class Contenedor{
    constructor (fileName){
        this.fileName = fileName;
        this.products = [];
    }

    async save(product){
        const response = {
            data:[],
            error: 'Can not save the product'
        }
        try{
            let file = await fs.readFile(this.fileName, 'utf-8');
            let products = JSON.parse(file);
            this.products = products;
            let dataProd = {
                nombre:product.nombre,
                descripcion:product.descripcion,
                price:product.price,
                thumbnail:product.thumbnail,
                id: this.products.length +1,
                stock: product.stock,
                code: product.code,
                timestamp: moment().format('DD/MM/YYYY HH:mm:ss')  
            }
                products.push(dataProd);
                try{
                    await fs.writeFile(this.fileName,JSON.stringify(products,null,2))
                    response.data = products;
                }catch(err){
                    response.error = err;
                }
                return response;
        }catch{
            let dataProd = {
                nombre:product.nombre,
                descripcion:product.descripcion,
                price:product.price,
                thumbnail:product.thumbnail,
                id: 1,
                stock: product.stock,
                code: product.code,
                timestamp: moment().format('DD/MM/YYYY HH:mm:ss')  
            }
            try{
                await fs.writeFile(this.fileName, JSON.stringify([dataProd],null,2))
                return id;
            }catch(error){
                return {status:"error",message:"Can not create the product"+error }
            }
        }
    }

    async getById(id){
        const response = {
            data:[],
            error: 'Could not find the Product'
        }
        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let json = JSON.parse(file);
            let product = json.find(product => product.id == parseInt(id));
            response.data = product;
        }
        catch(error){
            response.error = error; 
        }
        return response;
    }

    async getAll(){ 
        const response = {
            data:[],
            error: 'Could not find the products'
        }
        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let products = JSON.parse(file);
            this.products = products;
            response.data = this.products;
        }
        catch(error){
            response.error = error;
        }
        return response;
    }
    
    async deleteById(id){
        const response = {
            data:[],
            error: 'Could not find the Product'
        }
        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let products = JSON.parse(file);
            let productIndex = products.findIndex(product => product.id == id);
            if( productIndex === -1){
                response.error = 'There are no products with that ID';
            } else {
                let product = products.filter(product => product.id != id);
                let jsonString = JSON.stringify(product);
                try{
                    await fs.writeFile(this.fileName, jsonString);
                    response.data = product;
                }catch(err){
                    response.error = err;
                }
                return response;
        }
        }catch(err){
        response.error = err;
        }
    return response;
    }


    async updateProduct(id,newObj){
        const response = {
            data: null,
            error: 'Could not update the product'
        };
        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let products = JSON.parse(file);
            const productIndex = products.findIndex(product => product.id == id);
            if(productIndex === -1) 
            response.error = 'Could not find a product with that id ';
            else { 
                newObj.id = Number(id);
                products[productIndex] = newObj;
            };
            try{
                await fs.writeFile(this.fileName,JSON.stringify(products,null,2));
                response.data = products[productIndex];
            }catch{
                response.error = 'Could not update the product';
            }
        }catch(error){
            response.error = 'Could not update the product';
        }
        return response;
    }
}

module.exports = Contenedor;