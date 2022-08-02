const ModelCart = require('../Models/modelCarrito');
const modelCart = new ModelCart("./database/carrito.json");

// Nuevo Carrito
const createCart = async (req, res) => {
    const {data, error} =  await modelCart.create();
    data > 0 ? res.send(JSON.stringify(data)) : res.status(500).send(error);
    
}
// Elimina Carrito
const deleteCart = async (req, res) => {
    const {data, error} = await modelCart.deleteCartById(req.params.id);
    data ? res.send(data) : res.status(500).send(error);
}   
// Elimina Producto en Carrito
const deleteProductOnCart = async (req, res) => {
    const { id } = req.params;
    const {  idProduct } = req.params;
    const {data, error} = await modelCart.deleteProductCart(id, idProduct);
    data ? res.send(data) : res.status(500).send(error);
}
// Busca todos los productos del carrito
const getCartProducts = async (req, res) => {
    const { id } = req.params;
    const {data, error} = await modelCart.getCartProducts(id);
    data  ? res.send(data.products) : res.status(500).send(error);
}   
// Agrega producto al carrito
const addProductOnCart = async (req, res) => {
    const { id, productId } = req.params;
    const {data, error} = await modelCart.addToCart(id , productId);
    data  ? res.send(data) : res.status(500).send(error);
}

// Exporta módulos
module.exports = {
    createCart,
    deleteCart,
    deleteProductOnCart,
    getCartProducts,
    addProductOnCart
}