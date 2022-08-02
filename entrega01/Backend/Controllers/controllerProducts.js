const Model = require('../Models/modelProductos');
const model = new Model("./database/products.json");

// Busca todos los productos
const getAllProducts = async (req, res) => {
    const {data, error} = await model.getAll()
    data.length > 0 ? res.send(data) : res.status(500).send(error);
}

// Busca producto por id
const getProductById = async (req, res) => {
    const { id } = req.params;
    const {data, error} = await model.getById(id);
    !data ? res.status(500).send({error}) : res.send(data);
}

// Nuevo Producto
const newProduct = async (req, res) => {
    const producto = await model.save(req.body);
    const { data, error } = await producto;
    console.log(error);
    data ? res.send(data) : res.send({error}) ;
}

// Actualiza Producto por id
const updateProductById = async (req, res) => {
    const { id } = req.params; 
    const { data, error } = await model.updateProduct(id, req.body);
    data ? res.send(data) : res.send({error});
}

// Elimina Producto
const deleteProduct = async (req, res) => {
    const { id } = req.params; 
    const { data, error } = await model.deleteById(id);
    data.length != 0 ? res.send(data) : res.send({error});
}

// Módulos exportados
module.exports = {
    getAllProducts,
    getProductById,
    newProduct,
    updateProductById,
    deleteProduct
}