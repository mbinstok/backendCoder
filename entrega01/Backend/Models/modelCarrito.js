const fs = require("fs").promises;
const { timeStamp } = require("console");
const { json } = require("express/lib/response");
const { writeFile, readFile } = require("fs");
const moment = require("moment");

class Contenedor1 {
    constructor(fileName){
        this.fileName = fileName;
        this.cart = [];
        this.id = 0;
    }

    async create(){
        const response = {
            data:[],
            error: 'Could not create the cart'
        }
        try {
            const file = await fs.readFile(this.fileName, "utf8")
            let cart = JSON.parse(file);
            this.id = cart.length +1;
            const newCart = { 
                id: this.id,
                products: [],
                timestamp: moment().format('DD/MM/YYYY HH:mm:ss')      
            }
            cart.push(newCart);
            try {
                await fs.writeFile(this.fileName,JSON.stringify(cart,null,2));
                response.data = this.id;
            }catch(err){
                response.error = err;
            }
            return response;
        }catch(err){
            const newCart = { 
                id: 1,
                products: [],
                timestamp: moment().format('DD/MM/YYYY HH:mm:ss')      
            }
            try {
                await fs.writeFile(this.fileName,JSON.stringify([newCart],null,2))
                response.data = newCart.id;
            }catch(err){
                response.error = err;
            }
        }
        return response;
    };

    async deleteCartById(id){
        const response = {
            data:"",
            error: 'Could not delete the cart'
        }
        try {
            const file = await fs.readFile(this.fileName, "utf8")
            let carts = JSON.parse(file);
            this.data = carts;
            const deleteIndex = this.data.findIndex(cart => cart.id == id);
            if (deleteIndex === -1 ){
                console.log("Id not found; ");
                response.data = "Id not found"
            } else{
                this.data.splice(deleteIndex,1)
                await fs.writeFile(this.fileName, JSON.stringify(this.data, null, 2));
                response.data = "Cart deleted successfully";
            }
        } catch(err){
            response.error = err;
        } 
            return response;
    }   


    async addToCart(idCart, productId) {
        const response = {
            data:"",
            error: 'Id not found'
        }
        try{
            const productsTxt = await fs.readFile("./database/products.json", "utf8");
            const productsJSON = JSON.parse(productsTxt);
            const productFind = productsJSON.find(product => product.id == productId);
            if(!productFind){
                response.error = 'Product Id not found';
            } else { 
                const file = await fs.readFile(this.fileName, "utf8")
                let carts = JSON.parse(file);
                this.data = carts;
                const cartIndex = carts.findIndex(cart => cart.id == idCart);
                if(cartIndex === -1){
                    response.error = 'Cart Id not found';
                }else{
                    const newProductOnCart = {
                    ...productFind,
                    stock: productFind.stock - 1,
                    timeStamp:moment().format("DD/MM/YYYY HH:mm:ss")
                    }
                    carts[cartIndex].products.push(newProductOnCart);
                    await fs.writeFile(this.fileName, JSON.stringify(carts, null, 2));
                }         
                response.data = "Product added to cart";
                return response;
                }
            
        } catch (error) {
            response.error = 'Read Error';
        }
        return response;
    }

    async getCartProducts(id) {
        const response = {
            data:{},
            error: 'Cart not found'
        }
        try {
            const file = await fs.readFile(this.fileName, "utf8")
            let carts = JSON.parse(file);
            this.data = carts;
            const cartIndex = carts.find(cart => cart.id === parseInt(id));
            if(cartIndex === -1){
                response.error = "Cart not found";
            } else {
                response.data = cartIndex;
            }
            return response;
        } catch (error) {
            return response;
        }
    }

    deleteProductCart = async (idCart, idProduct) =>{
        const response = {
            data: undefined,
            error: ''
        }
        try{
            const file = await fs.readFile(this.fileName, "utf8")
            let carts = JSON.parse(file);
            this.data = carts;
            const cartIndex = carts.findIndex(cart => cart.id == idCart);
            if(cartIndex === -1){
                response.error = 'Cart ID not found'
            } else{
                const productIndex = carts[cartIndex].products.findIndex(product => product.id == idProduct);
                if(productIndex === -1){
                    response.error = 'Product ID not found';
                } else { 
                    carts[cartIndex].products.splice(productIndex, 1);
                await fs.writeFile(this.fileName, JSON.stringify(carts, null, 2));
                response.data = "Product deleted successfully";
            }         
            return response;
            }
        }  catch (error) {
            return 'Read Error'+ error;
        }
        return response
    }

}

module.exports = Contenedor1;