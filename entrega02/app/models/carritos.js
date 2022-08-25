const {Schema, model} = require('mongoose')


const carritoSchema = Schema({
    fecha: Date,
    productos: [{ type: Schema.Types.ObjectId, ref: 'productos' }]
});

module.exports = model('carritos', carritoSchema);